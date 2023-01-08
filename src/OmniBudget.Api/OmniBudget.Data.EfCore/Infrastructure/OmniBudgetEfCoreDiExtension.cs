using Microsoft.Extensions.DependencyInjection;
using OmniBudget.Core.Accounts.Repositories;
using OmniBudget.Core.Budget.Repositories;
using OmniBudget.Core.Categories.Repositories;
using OmniBudget.Core.Transactions.Repositories;
using OmniBudget.Core.Users.Repositories;
using OmniBudget.Data.EfCore.Repositories;

namespace OmniBudget.Data.EfCore.Infrastructure
{
    public static class OmniBudgetEfCoreDiExtension
    {
        public static void AddOmniBudgetEfCore(this IServiceCollection services)
        {
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IBudgetRepository, BudgetRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IRecurringTransactionRepository, RecurringTransactionRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}