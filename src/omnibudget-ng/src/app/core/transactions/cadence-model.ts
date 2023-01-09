import { TimePeriod } from "../models/time-period-enum";

export interface CadenceModel {
  guid: string;
  name: string;
  description: string;
  accountGuid: string;
  categoryGuid: string;
  amount: number;
  interval: number;
  timePeriod: TimePeriod;
}