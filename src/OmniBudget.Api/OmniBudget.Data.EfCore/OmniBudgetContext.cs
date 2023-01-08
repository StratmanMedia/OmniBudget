using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OmniBudget.Core.Accounts.Entities;
using OmniBudget.Core.Budget.Entities;
using OmniBudget.Core.Categories.Entities;
using OmniBudget.Core.Shared.Enumerations;
using OmniBudget.Core.Transactions.Entities;
using OmniBudget.Core.Users.Entities;

namespace OmniBudget.Data.EfCore
{
    public class OmniBudgetContext : DbContext
    {
        public OmniBudgetContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<Budget> Budget { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<RecurringTransaction> RecurringTransaction { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Budget>()
                .Property(b => b.TimePeriod)
                .HasConversion(new ValueConverter<TimePeriod, int>(
                    v => (int)v,
                    v => (TimePeriod)v));

            modelBuilder
                .Entity<RecurringTransaction>()
                .Property(r => r.TimePeriod)
                .HasConversion(new ValueConverter<TimePeriod, int>(
                    v => (int)v,
                    v => (TimePeriod)v));
        }
    }
}