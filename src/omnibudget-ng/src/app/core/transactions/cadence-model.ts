import { AccountModel } from "../accounts/account-model";
import { CategoryModel } from "../categories/category-model";
import { TimePeriod } from "../models/time-period-enum";

export interface CadenceModel {
  guid: string;
  name: string;
  description: string;
  accountGuid: string;
  account: AccountModel;
  categoryGuid: string;
  category: CategoryModel;
  amount: number;
  interval: number;
  timePeriod: TimePeriod;
}