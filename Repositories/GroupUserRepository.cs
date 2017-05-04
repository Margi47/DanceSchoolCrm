using angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Repositories
{
    public class GroupUserRepository: IGroupUserRepository
    {
        readonly CrmContext _context;

        public GroupUserRepository(CrmContext context)
        {
            _context = context;
        }

        public IEnumerable<Group> GetGroupsByUser(int id)
        {
            return _context.Users.Where(u => u.Id == id)
                .SelectMany(x => x.Groups)
                .Select(x => x.Group)
                .ToList();
        }

        public IEnumerable<User> GetStudentsByGroup(int groupId)
        {
            return _context.Groups.Where(g => g.Id == groupId)
                .SelectMany(g => g.Students)
                .Select(u => u.User)
                .ToList();
        }

        public void AddGroupUser(int userId, int groupId)
        {
            if (!_context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                _context.GroupUser.Add(new GroupUser { GroupId = groupId, UserId = userId });
                _context.SaveChanges();
            }
        }

        public void RemoveGroupUser(int userId, int groupId)
        {
            var entity = _context.GroupUser
                .FirstOrDefault(g => g.GroupId == groupId && g.UserId == userId);
            if (entity != null)
            {
                _context.GroupUser.Remove(entity);
                _context.SaveChanges();
            }
        }
    }
}
