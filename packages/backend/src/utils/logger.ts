import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const LOG_DIR = path.join(__dirname, "../../logs"); 

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new DailyRotateFile({
      filename: path.join(LOG_DIR, "error-%DATE%.log"), 
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      filename: path.join(LOG_DIR, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    })
  );
}

export default logger;