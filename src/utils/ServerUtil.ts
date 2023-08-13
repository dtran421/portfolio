import axios, { AxiosError } from "axios";
import { addColors, createLogger, format, transports } from "winston";

import "server-only";

const { combine, timestamp, label, printf, colorize, json } = format;
const { File, Console } = transports;

export const IS_PROD = process.env.VERCEL_ENV === "production";

export const logger = createLogger({
  level: "info",
  format: json(),
  defaultMeta: { service: "portfolio" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new File({ filename: "error.log", level: "error" }),
    new File({ filename: "combined.log" }),
  ],
  exceptionHandlers: [new File({ filename: "exceptions.log" })],
});

addColors({
  info: "cyan",
  warn: "yellow italic",
  error: "red bold",
});

const logFormat = printf(
  ({ level, message, label: logLabel, timestamp: logTimestamp }) => `[${logLabel}] ${logTimestamp} ${level}: ${message}`
);

//
// If we're not in production then log to the `console` with the format:
// `[DEBUG] ${timestamp} ${level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (!IS_PROD) {
  logger.add(
    new Console({
      format: combine(
        format((info) => ({
          ...info,
          level: info.level.toUpperCase(),
        }))(),
        label({ label: "DEBUG" }),
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        colorize(),
        logFormat
      ),
    })
  );
}

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    if (!IS_PROD) {
      logger.info(`[${config.method?.toUpperCase()}]: ${config.url}`);
      if (config.data) {
        logger.info(`Body: ${JSON.stringify(config.data)}`);
      }
    }

    return config;
  },
  (error: AxiosError) => {
    const { cause, config } = error;
    logger.error(`[${config?.method?.toUpperCase()}]: ${config?.url}${cause && `==> ${cause}`}`);

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    if (!IS_PROD) {
      logger.info(
        `[${response.config.method?.toUpperCase()}]: ${response.config.url} ==> ${response.status} ${
          response.statusText
        }`
      );
    }

    return response;
  },
  (error) => {
    const { cause, config, response } = error;
    logger.error(`[${config.method?.toUpperCase()}]: ${config.url} ==> ${response.status} ${response.statusText}`);
    if (cause) {
      logger.error(`Error: ${cause}`);
    }

    return Promise.reject(error);
  }
);
