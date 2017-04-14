using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace angular.Models
{
    public class TeacherRepository : CrudRepository<Teacher>, ITeacherRepository
    {
        public TeacherRepository(CrmContext context) : base(context)
        {}

        public override Func<Teacher, bool> GetExpression(int key)
        {
            return Teacher=>Teacher.Id == key;
        }

        public override DbSet<Teacher> GetQuery(CrmContext context)
        {
            return context.Teachers;
        }

        /*public IEnumerable<Group> GetGroups(int id)
        {
            return Context.Users.Where(u => u.Id == id)
                .SelectMany(x => x.Groups)
                .Select(x=> x.Group)
                .ToList();
        }

        public Group GetUserGroup(int groupId)
        {
            return Context.Groups.FirstOrDefault(g => g.Id == groupId);
        }

        public void AddGroup(int userId, int groupId)
        {
            if (!Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                Context.GroupUser.Add(new GroupUser { GroupId = groupId, UserId = userId });
                Context.SaveChanges();
            }
        }

        public void RemoveGroup(int userId, int groupId)
        {
            if (Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                var entity = Context.GroupUser.First(g => g.GroupId == groupId && g.UserId == userId);

                Context.GroupUser.Remove(entity);
                Context.SaveChanges();
            }
        }*/

    }
}
