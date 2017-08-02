using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DanceSchoolCrm.Repositories;

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

        public override void Remove(User item)
        {
            base.Remove(item);

            var teacher = Context.Teachers.FirstOrDefault(t => t.Id == item.Id);
            if(teacher != null)
            {
                Context.Teachers.Remove(teacher);
                Context.SaveChanges();
            }
        }

        public User[] GetAvailableTeachers()
        {
            var result = Context.Users
                .FilterDeleted()
                .Where(u => u.IsActive && 
                    !Context.Teachers.Any(t => t.Id == u.Id))
                .ToArray();
            return result;
        }
    }
}
