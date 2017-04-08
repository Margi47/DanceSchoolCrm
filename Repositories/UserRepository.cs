using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace angular.Models
{
    public class UserRepository : CrudRepository<User>, IUserRepository
    {
        public UserRepository(CrmContext context) : base(context)
        {}

        public override Func<User, bool> GetExpression(int key)
        {
            return User=>User.Id == key;
        }

        public override DbSet<User> GetQuery(CrmContext context)
        {
            return context.Users;
        }

        public IEnumerable<Group> GetGroups(int id)
        {
            return Context.Users.Where(u => u.Id == id)
                .SelectMany(x => x.Groups)
                .Select(x=> x.Group)
                .ToList();
        }

        public void AddGroup(int userId, int groupId)
        {
            if (!Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                Context.GroupUser.Add(new GroupUser { GroupId = groupId, UserId = userId });
                Context.SaveChanges();
            }
        }

    }
}
