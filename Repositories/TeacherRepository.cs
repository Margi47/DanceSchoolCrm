using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using angular.Exceptions;

namespace angular.Models
{
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

        public void AddTeacher(Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            _context.SaveChanges();
            var user = _context.Users.First(x => x.Id == teacher.Id);
            user.IsTeacher = true;
            _context.SaveChanges();
        }

        public Teacher GetTeacher(int teacherId)
        {
            var teacher = _context.Teachers
                .Where(t => t.Id == teacherId).FirstOrDefault();

            return teacher;
        }

        public void RemoveTeacher(Teacher item)
        {
            var user = _context.Users.First(x => x.Id == item.Id);
            user.IsTeacher = false;
            _context.SaveChanges();
            _context.Teachers.Remove(item);
            _context.SaveChanges();
        }
    }
}
