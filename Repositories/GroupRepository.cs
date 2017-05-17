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
        { }

        public override Func<Group, bool> GetExpression(int key)
        {
            return Group => Group.Id == key; ;
        }

        public override DbSet<Group> GetQuery(CrmContext context)
        {
            return context.Groups;
        }

        public IEnumerable<Group> GetAvailableGroups(int id)
        {
            var addedGroups = Context.GroupUser.Where(g => g.UserId == id).Select(g => g.Group).ToArray();
            var result = Context.Groups.Except(addedGroups).ToArray();
            return result;
        }
    }
}