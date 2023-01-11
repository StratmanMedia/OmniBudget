import { environment } from 'src/environments/environment';
import { LogLevel } from './log-level';
import { LoggingOptions } from './logging-options';

export class LoggingService {

  constructor(private _options: LoggingOptions) {
    this.resolveOptions();
  }

  trace(message: string) {
    if (this._options.minimumLogLevel || 0 <= LogLevel.TRACE) {
      console.log(`${this._options.callerName}:TRACE: ${message}`);
    }
  }

  debug(message: string) {
    if (this._options.minimumLogLevel || 0 <= LogLevel.DEBUG) {
      console.log(`${this._options.callerName}:DEBUG: ${message}`);
    }
  }

  info(message: string) {
    if (this._options.minimumLogLevel || 0 <= LogLevel.INFO) {
      console.log(`${this._options.callerName}:INFO: ${message}`);
    }
  }

  warn(message: string) {
    if (this._options.minimumLogLevel || 0 <= LogLevel.WARN) {
      console.warn(`${this._options.callerName}:WARN: ${message}`);
    }
  }

  error(message: string) {
    if (this._options.minimumLogLevel || 0 <= LogLevel.ERROR) {
      console.error(`${this._options.callerName}:ERROR: ${message}`);
    }
  }

  private resolveOptions(): void {
    if (!!this._options.minimumLogLevel) {
      this._options.minimumLogLevel = this._options.minimumLogLevel;
    } else {
      switch (environment.minimumLoggingLevel.toUpperCase()) {
        case 'TRACE': { this._options.minimumLogLevel = LogLevel.TRACE; break; }
        case 'DEBUG': { this._options.minimumLogLevel = LogLevel.DEBUG; break; }
        case 'INFO': { this._options.minimumLogLevel = LogLevel.INFO; break; }
        case 'WARN': { this._options.minimumLogLevel = LogLevel.WARN; break; }
        case 'ERROR': { this._options.minimumLogLevel = LogLevel.ERROR; break; }
        default: { this._options.minimumLogLevel = LogLevel.ERROR; break; }
      }
    }
  }
}
