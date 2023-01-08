import { AccountModel } from "../accounts/account-model";
import { CategoryModel } from "../categories/category-model";
import { TimePeriod } from "../models/time-period.enum";

export interface CadenceModel {
  guid: string;
  name: string;
  description: string;
  accountGuid: string;
  account: AccountModel | null | undefined;
  categoryGuid: string;
  category: CategoryModel | null | undefined;
  amount: number;
  interval: number;
  timePeriod: TimePeriod;
}