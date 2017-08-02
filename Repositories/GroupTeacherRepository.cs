using angular.Exceptions;
using angular.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceSchoolCrm.Repositories;

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
            var group = _context.Groups.FilterDeleted()
                .FirstOrDefault(g => g.Id == groupId);
            if(group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            return _context.GroupTeachers
                           .Where(g => g.GroupId == groupId)
                           .Select(g => g.Teacher)
                           .FilterDeleted()
                           .Select(t => t.User)
                           .ToList();
        }

        public IEnumerable<Group> GetGroupsByTeacher(int teacherId)
        {
            var teacher = _context.Teachers.FilterDeleted()
                .FirstOrDefault(t => t.Id == teacherId);
            if (teacher == null)
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

            return _context.GroupTeachers
                           .Where(g => g.TeacherId == teacherId)
                           .Select(g => g.Group)
                           .FilterDeleted()
                           .ToList();
        }

        public void AddGroupTeachers(int groupId, int teacherId)
        {
            _context.GroupTeachers.Add(new GroupTeachers { GroupId = groupId, TeacherId = teacherId });
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
            var group = _context.Groups.FilterDeleted()
                .FirstOrDefault(g => g.Id == groupId);
            if (group == null)
            {
                throw new EntityNotFoundException("Group", groupId);
            }

            var result = _context.Teachers
                .FilterDeleted()
                .Where(t => t.IsActive &&
                    !_context.GroupTeachers.Any(g => g.GroupId == groupId && g.TeacherId == t.Id))
                .Select(t => t.User)
                .ToArray();
            return result;
        }

        public IEnumerable<Group> GetAvailableGroups(int teacherId)
        {
            var teacher = _context.Teachers.FilterDeleted()
                .FirstOrDefault(t => t.Id == teacherId);
            if (teacher == null)
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

            var result = _context.Groups
                .FilterDeleted()
                .Where(g => g.IsActive && 
                    !_context.GroupTeachers.Any(t => t.GroupId == g.Id && t.TeacherId == teacherId))
                .ToArray();
            return result;
        }
    }
}
