using angular.Exceptions;
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
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if(group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            return _context.GroupTeachers
                           .Where(g => g.GroupId == groupId)
                           .Select(g => g.Teacher.User)
                           .ToList();
        }

        public IEnumerable<Group> GetGroupsByTeacher(int teacherId)
        {
            var teacher = _context.Teachers.FirstOrDefault(t => t.Id == teacherId);
            if (teacher == null)
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

            return _context.GroupTeachers
                           .Where(g => g.TeacherId == teacherId)
                           .Select(g => g.Group)
                           .ToList();
        }

        public void AddGroupTeachers(int groupId, int teacherId)
        {

            if (_context.GroupTeachers.Any(g => g.GroupId == groupId && g.TeacherId == teacherId))
            {
                throw new EntityDuplicateException("Group-Teacher", groupId, teacherId);
            }

            if (!_context.Groups.Any(g => g.Id == groupId))
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            if (!_context.Teachers.Any(t => t.Id == teacherId))
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

            _context.GroupTeachers.Add(new GroupTeachers { GroupId = groupId, TeacherId = teacherId });
            _context.SaveChanges();
        }

        public void RemoveGroupTeacher(int groupId, int teacherId)
        {
            var entity = _context.GroupTeachers
                .FirstOrDefault(g => g.GroupId == groupId && g.TeacherId == teacherId);

            if (entity == null)
            {
                throw new EntityNotFoundException("Group-Teacher", groupId, teacherId);
            }

            _context.GroupTeachers.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAvailableTeachers(int groupId)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            var result = _context.Teachers
                .Where(t => !_context.GroupTeachers.Any(g => g.GroupId == groupId && g.TeacherId == t.Id))
                .Select(t => t.User)
                .ToArray();
            return result;
        }

        public IEnumerable<Group> GetAvailableGroups(int teacherId)
        {
            var teacher = _context.Teachers.FirstOrDefault(t => t.Id == teacherId);
            if (teacher == null)
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

            var result = _context.Groups
                .Where(g => g.IsActive && !_context.GroupTeachers.Any(t => t.GroupId == g.Id && t.TeacherId == teacherId))
                .ToArray();
            return result;
        }
    }
}
