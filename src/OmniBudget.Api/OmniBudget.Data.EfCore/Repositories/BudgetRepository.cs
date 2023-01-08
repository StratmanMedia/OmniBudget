using OmniBudget.Core.Budget.Entities;
using OmniBudget.Core.Budget.Repositories;
using StratmanMedia.Repositories.EFCore;

namespace OmniBudget.Data.EfCore.Repositories
{
    public class BudgetRepository : Repository<OmniBudgetContext, Budget>, IBudgetRepository
    {
        public BudgetRepository(OmniBudgetContext context) : base(context)
        {
        }
    }
}