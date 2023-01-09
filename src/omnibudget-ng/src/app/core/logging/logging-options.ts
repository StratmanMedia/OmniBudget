import { LogLevel } from "./log-level";

export interface LoggingOptions {
  minimumLogLevel?: LogLevel;
  callerName: string;
}
