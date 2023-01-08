using System;
using OmniBudget.Core.Accounts.Entities;
using OmniBudget.Core.Categories.Entities;
using OmniBudget.Core.Shared.Enumerations;
using OmniBudget.Core.Users.Entities;

namespace OmniBudget.Core.Transactions.Entities
{
    public class RecurringTransaction
    {
        public long Id { get; set; }
        public Guid Guid { get; set; }
        public User Owner { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Account Account { get; set; }
        public Category Category { get; set; }
        public long Amount { get; set; }
        public int Interval { get; set; }
        public TimePeriod TimePeriod { get; set; }
    }
}