using OmniBudget.Core.Users.Entities;
using OmniBudget.Core.Users.Repositories;
using StratmanMedia.Repositories.EFCore;

namespace OmniBudget.Data.EfCore.Repositories
{
    public class UserRepository : Repository<OmniBudgetContext, User>, IUserRepository
    {
        public UserRepository(OmniBudgetContext context) : base(context)
        {
        }
    }
}