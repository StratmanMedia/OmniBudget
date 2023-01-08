export class SortUtil {
  public static sort(a: any, b: any, ascending: boolean = true): number {
    if (a < b) { return ascending ? -1 : 1; }
    if (a > b) { return ascending ? 1 : -1; }
    return 0;
  }
}