export class LoggingService {
  constructor(private _className: string) { }

  trace(message: string) {
    console.log(`${this._className}:TRACE: ${message}`);
  }

  debug(message: string) {
    console.log(`${this._className}:DEBUG: ${message}`);
  }

  info(message: string) {
    console.log(`${this._className}:INFO: ${message}`);
  }

  warn(message: string) {
    console.warn(`${this._className}:WARN: ${message}`);
  }

  error(message: string) {
    console.error(`${this._className}:ERROR: ${message}`);
  }
}
