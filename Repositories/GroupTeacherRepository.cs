using angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Repositories
{
    public class GroupTeacherRepository: IGroupTeacherRepository
    {
        readonly CrmContext _context;

        public GroupTeacherRepository(CrmContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetTeachersByGroup(int groupId)
        {
            return _context.GroupTeachers
                           .Where(g => g.GroupId == groupId)
                           .Select(g => g.Teacher.User)
                           .ToList();
        }

        public IEnumerable<Group> GetGroupsByTeacher(int teacherId)
        {
            return _context.GroupTeachers
                           .Where(g => g.TeacherId == teacherId)
                           .Select(g => g.Group)
                           .ToList();
        }

        public void AddGroupTeachers(int groupId, int[] teachers)
        {
            var existingItems = _context.GroupTeachers
                .Where(g => g.GroupId == groupId && teachers.Contains(g.TeacherId))
                .Select(g => g.TeacherId)
                .ToArray();

            var newTeachers = teachers.Except(existingItems);

            foreach (var t in newTeachers)
            {
                _context.GroupTeachers.Add(new GroupTeachers { GroupId = groupId, TeacherId = t });
            }
            _context.SaveChanges();
        }

        public void AddTeacherGroups(int teacherId, int[] groups)
        {
            var existingGroups = _context.GroupTeachers
                .Where(g => g.TeacherId == teacherId && groups.Contains(g.GroupId))
                .Select(g => g.GroupId)
                .ToArray();

            var newGroups = groups.Except(existingGroups);

            foreach (var g in newGroups)
            {
                _context.GroupTeachers.Add(new GroupTeachers { GroupId = g, TeacherId = teacherId });
            }
            _context.SaveChanges();
        }

        public void RemoveGroupTeacher(int groupId, int teacherId)
        {
            var entity = _context.GroupTeachers
                .FirstOrDefault(g => g.GroupId == groupId && g.TeacherId == teacherId);

            if (entity != null)
            {
                _context.GroupTeachers.Remove(entity);
                _context.SaveChanges();
            }
        }

        public IEnumerable<User> GetAvailableTeachers(int groupId)
        {
            var result = _context.Teachers
                .Where(t => !_context.GroupTeachers.Any(g => g.GroupId == groupId && g.TeacherId == t.Id))
                .Select(t => t.User)
                .ToArray();
            return result;
        }

        public IEnumerable<Group> GetAvailableGroups(int teacherId)
        {
            var result = _context.Groups
                .Where(g => g.IsActive && !_context.GroupTeachers.Any(t => t.GroupId == g.Id && t.TeacherId == teacherId))
                .ToArray();
            return result;
        }
    }
}
