using System;
using OmniBudget.Core.Users.Entities;

namespace OmniBudget.Core.Accounts.Entities
{
    public class Account
    {
        public long Id { get; set; }
        public Guid Guid { get; set; }
        public User Owner { get; set; }
        public string Name { get; set; }
    }
}