using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace crm_webapi.Models
{
    public class UserRepository : CrudRepository<User>, IUserRepository
    {
        public UserRepository(CrmContext context) : base(context)
        {}

        public override DbSet<User> GetQuery(CrmContext context)
        {
            return context.Users;
        }

        public User[] GetAvailableTeachers(Parameters parameters)
        {
            var items = Context.Users.AsQueryable();
            if (!String.IsNullOrWhiteSpace(parameters.Filter))
            {
                items = items.Where(x => x.Name.Contains(parameters.Filter.Trim()));
            }

            var result = items
                .Where(u => u.IsActive && !Context.Teachers.Any(t => t.Id == u.Id))
                .Skip((parameters.Page - 1) * parameters.PageSize)
                            .Take(parameters.PageSize)
                .ToArray();
            return result;
        }

        public int CountTeachers(string filter)
        {
            var items = Context.Users.AsQueryable();
            if (!String.IsNullOrWhiteSpace(filter))
            {
                items = items.Where(x => x.Name.Contains(filter.Trim()));
            }

            return items
                .Where(u => u.IsActive && !Context.Teachers.Any(t => t.Id == u.Id))
                .Count();
        }
    }
}
