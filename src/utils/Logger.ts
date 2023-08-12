import { addColors, createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf, colorize, json } = format;
const { File, Console } = transports;

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
if (process.env.NODE_ENV !== "production") {
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
