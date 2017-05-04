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

        public TeacherDto GetTeacher(int teacherId)
        {
            var user = _context.Teachers
                .Where(t => t.Id == teacherId)
                .Select(t => t.User).FirstOrDefault();

            if(user == null)
            {
                throw new DataValidationException();
            }

            var teacherDto = new TeacherDto
            {
                Teacher = user,
            };

            return teacherDto;
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
    }
}
