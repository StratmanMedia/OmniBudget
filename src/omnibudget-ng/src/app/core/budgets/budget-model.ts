import { TimePeriod } from "../models/time-period-enum";

export class BudgetModel {
  guid: string;
  name: string;
  accountGuid: string;
  categoryGuid: string;
  amount: number;
  interval: number;
  timePeriod: TimePeriod
}