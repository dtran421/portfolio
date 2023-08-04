import winston, { addColors, format } from "winston";

const { combine, timestamp, label, printf, colorize } = format;

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "portfolio" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
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
    new winston.transports.Console({
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
