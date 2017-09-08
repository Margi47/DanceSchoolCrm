using crm_webapi.Exceptions;
using crm_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Repositories
{
    public class GroupUserRepository: IGroupUserRepository
    {
        readonly CrmContext _context;

        public GroupUserRepository(CrmContext context)
        {
            _context = context;
        }

        public IEnumerable<Group> GetGroupsByUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new EntityNotFoundException("User", userId);
            }

            return _context.Users.Where(u => u.Id == userId)
                .SelectMany(x => x.Groups)
                .Select(x => x.Group)
                .ToList();
        }

        public IEnumerable<User> GetStudentsByGroup(int groupId)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            return _context.Groups.Where(g => g.Id == groupId)
                .SelectMany(g => g.Students)
                .Select(u => u.User)
                .ToList();
        }

        public void AddGroupUser(int userId, int groupId)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new EntityNotFoundException("User", userId);
            }

            if (_context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                throw new EntityDuplicateException("Group-User", groupId, userId);
            }

            _context.GroupUser.Add(new GroupUser { GroupId = groupId, UserId = userId });
            _context.SaveChanges();
        }

        public void RemoveGroupUser(int userId, int groupId)
        {
            var entity = _context.GroupUser
                .FirstOrDefault(g => g.GroupId == groupId && g.UserId == userId);
            if (entity == null)
            {
                throw new EntityNotFoundException("Group-User", groupId, userId);
            }

            _context.GroupUser.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAvailableStudents(int groupId, Parameters parameters)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            var result = _context.Users
                .Where(u => u.IsActive && !_context.GroupUser.Any(g => g.UserId == u.Id && g.GroupId == groupId))
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize).ToList();

            return result;
        }

        public int GetTotalStudents(int groupId)
        {
            return _context.Users
                .Where(u => u.IsActive && !_context.GroupUser.Any(g => g.UserId == u.Id && g.GroupId == groupId))
                .Count();
        }

        public IEnumerable<Group> GetAvailableGroups(int userId, Parameters parameters)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new EntityNotFoundException("User", userId);
            }

            var result = _context.Groups
                .Where(g => g.IsActive && !_context.GroupUser.Any(u => u.GroupId == g.Id && u.UserId == userId))
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize).ToList();

            return result;
        }

        public int GetTotalGroups(int userId)
        {
            return _context.Groups
                .Where(g => g.IsActive && !_context.GroupUser.Any(u => u.GroupId == g.Id && u.UserId == userId))
                .Count();
        }
    }
}
