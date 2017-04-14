using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace angular.Models
{
    public class GroupRepository : CrudRepository<Group>, IGroupRepository
    {
        public GroupRepository(CrmContext context) : base(context)
        {}

        public override Func<Group, bool> GetExpression(int key)
        {
            return Group => Group.Id == key; ;
        }

        public override DbSet<Group> GetQuery(CrmContext context)
        {
            return context.Groups;
        }

        public IEnumerable<User> GetStudents(int groupId)
        {
            return Context.Groups.Where(g => g.Id == groupId)
                .SelectMany(g => g.Students)
                .Select(u => u.User)
                .ToList();                
        }

        public User GetGroupUser(int userId)
        {
            return Context.Users.FirstOrDefault(u => u.Id == userId);
        }

        public void AddStudent(int groupId, int userId)
        {
            if (!Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                Context.GroupUser.Add(new GroupUser { GroupId = groupId, UserId = userId });
                Context.SaveChanges();
            }
        }

        public void RemoveStudent(int groupId, int userId)
        {
            if (Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                var entity = Context.GroupUser.First(g => g.GroupId == groupId && g.UserId == userId);

                Context.GroupUser.Remove(entity);
                Context.SaveChanges();
            }
        }
    }
}
