using OmniBudget.Core.Transactions.Entities;
using OmniBudget.Core.Transactions.Repositories;
using StratmanMedia.Repositories.EFCore;

namespace OmniBudget.Data.EfCore.Repositories
{
    public class RecurringTransactionRepository : Repository<OmniBudgetContext, RecurringTransaction>, IRecurringTransactionRepository
    {
        public RecurringTransactionRepository(OmniBudgetContext context) : base(context)
        {
        }
    }
}