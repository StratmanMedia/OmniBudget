export class LocalStorageKeys {
  private static prefix = 'omni';
  static readonly default = this.prefix;
  static readonly accountStore = `${this.prefix}.accounts`;
  static readonly categoryStore = `${this.prefix}.categories`;
  static readonly transactionStore = `${this.prefix}.transactions`;
  static readonly cadenceStore = `${this.prefix}.cadences`;
}