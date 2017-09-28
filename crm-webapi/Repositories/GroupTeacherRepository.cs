using crm_webapi.Exceptions;
using crm_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Repositories
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

        public IEnumerable<User> GetAvailableTeachers(int groupId, Parameters parameters)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            var items = _context.Teachers.AsQueryable();
            if (!String.IsNullOrWhiteSpace(parameters.Filter))
            {
                items = items.Where(x => x.User.Name.Contains(parameters.Filter.Trim()));
            }

            var result = items.Where(t => !_context.GroupTeachers.Any(g => g.GroupId == groupId && g.TeacherId == t.Id))
                .Select(t => t.User)
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize).ToList();
            return result;
        }

        public int GetTotalTeachers(int groupId)
        {
            return _context.Teachers
                .Where(t => !_context.GroupTeachers.Any(g => g.GroupId == groupId && g.TeacherId == t.Id))
                .Count();
        }

        public IEnumerable<Group> GetAvailableGroups(int teacherId, Parameters parameters)
        {
            var teacher = _context.Teachers.FirstOrDefault(t => t.Id == teacherId);
            if (teacher == null)
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

            var items = _context.Groups.AsQueryable();
            if (!String.IsNullOrWhiteSpace(parameters.Filter))
            {
                items = items.Where(x => x.Name.Contains(parameters.Filter.Trim()));
            }

            var result = items
                .Where(g => g.IsActive && !_context.GroupTeachers.Any(t => t.GroupId == g.Id && t.TeacherId == teacherId))
                .Skip((parameters.Page - 1) * parameters.PageSize)
                .Take(parameters.PageSize).ToList();
            return result;
        }

        public int GetTotalGroups(int teacherId)
        {
            return _context.Groups
                .Where(g => g.IsActive && !_context.GroupTeachers.Any(t => t.GroupId == g.Id && t.TeacherId == teacherId))
                .Count();
        }
    }
}
