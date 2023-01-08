import { AccountModel } from "../accounts/account-model";
import { CategoryModel } from "../categories/category-model";
import { TimePeriod } from "../models/time-period-enum";

export class BudgetModel {
  guid: string;
  name: string;
  account: AccountModel;
  category: CategoryModel;
  amount: number;
  interval: number;
  timePeriod: TimePeriod
}