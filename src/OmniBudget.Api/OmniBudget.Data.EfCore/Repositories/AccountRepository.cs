using OmniBudget.Core.Accounts.Entities;
using OmniBudget.Core.Accounts.Repositories;
using StratmanMedia.Repositories.EFCore;

namespace OmniBudget.Data.EfCore.Repositories
{
    public class AccountRepository : Repository<OmniBudgetContext, Account>, IAccountRepository
    {
        public AccountRepository(OmniBudgetContext context) : base(context)
        {
        }
    }
}