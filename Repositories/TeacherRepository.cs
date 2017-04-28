using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using angular.Exceptions;

namespace angular.Models
{
    public class TeacherDto
    {
        public User Teacher { get; set; }
        public Group[] Groups { get; set; }
    }

    public class TeacherRepository : ITeacherRepository
    {
        readonly CrmContext _context;

        public TeacherRepository(CrmContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetTeachers()
        {
            return _context.Teachers.Select(t => t.User);
        }

        public IEnumerable<TeacherDto> GetAllTeachersInfo()
        {
            var users = _context.Teachers.Select(t => t.User).ToArray();
            var usersId = users.Select(u => u.Id).ToArray();
            var groups = _context.GroupTeachers.Where(g => usersId.Contains(g.TeacherId))
                .Select(g => new { g.TeacherId, g.Group})
                .ToArray()
                .GroupBy(x => x.TeacherId)
                .ToDictionary(x => x.Key, e => e.Select(y => y.Group).ToArray());

            var teachers = new List<TeacherDto>();
            foreach(var user in users)
            {
                var teacherDto = new TeacherDto
                {
                    Teacher = user,
                    Groups = groups.ContainsKey(user.Id) ? groups[user.Id] : new Group[0]
                };
                teachers.Add(teacherDto);
            }
            return teachers;
        }

        public void AddTeacher(Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            _context.SaveChanges();
            var user = _context.Users.First(x => x.Id == teacher.Id);
            user.IsTeacher = true;
            _context.SaveChanges();
        }

        public void AddGroups(int teacherId, int[] groups)
        {
            var existingGroups = _context.GroupTeachers.Where(g => g.TeacherId == teacherId && groups.Contains(g.GroupId))
                .Select(g => g.GroupId)
                .ToArray();
            var newGroups = groups.Except(existingGroups);

            foreach (var g in newGroups)
            {
                    _context.GroupTeachers.Add(new GroupTeachers { GroupId = g, TeacherId = teacherId });
            }
            _context.SaveChanges();
        }

        public TeacherDto GetTeacher(int teacherId)
        {
            var user = _context.Teachers
                .Where(t => t.Id == teacherId)
                .Select(t => t.User).FirstOrDefault();

            if(user == null)
            {
                throw new DataValidationException();
            }

            var groups = GetTeacherGroups(user.Id);

            var teacherDto = new TeacherDto
            {
                Teacher = user,
                Groups = groups
            };

            return teacherDto;
        }

        public Group[] GetTeacherGroups(int teacherId)
        {
            return _context.GroupTeachers
                .Where(g => g.TeacherId == teacherId)
                .Select(g => g.Group).ToArray();
        }

        public void RemoveTeacher(int id)
        {
            var user = _context.Users.First(x => x.Id == id);
            user.IsTeacher = false;
            _context.SaveChanges();
            var entity = _context.Teachers.First(t => t.Id == id);
            _context.Teachers.Remove(entity);
            _context.SaveChanges();
        }


        public Group GetGroup(int groupId)
        {
            return _context.Groups.First(g => g.Id == groupId);
        }

        public void RemoveGroup(int teacherId, int groupId)
        {
            var entity = _context.GroupTeachers.FirstOrDefault(g => g.GroupId == groupId && g.TeacherId == teacherId);
            if (entity != null)
            {
                _context.GroupTeachers.Remove(entity);
                _context.SaveChanges();
            }
        }

    }
}
