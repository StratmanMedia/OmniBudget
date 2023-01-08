using OmniBudget.Core.Categories.Entities;
using OmniBudget.Core.Categories.Repositories;
using StratmanMedia.Repositories.EFCore;

namespace OmniBudget.Data.EfCore.Repositories
{
    public class CategoryRepository : Repository<OmniBudgetContext, Category>, ICategoryRepository
    {
        public CategoryRepository(OmniBudgetContext context) : base(context)
        {
        }
    }
}