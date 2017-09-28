using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using crm_webapi.Exceptions;

namespace crm_webapi.Models
{
    public class TeacherRepository : ITeacherRepository
    {
        readonly CrmContext _context;

        public TeacherRepository(CrmContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetTeachers(Parameters parameters)
        {
            var items = _context.Teachers.AsQueryable();
            if (!String.IsNullOrWhiteSpace(parameters.Filter))
            {
                items = items.Where(x => x.User.Name.Contains(parameters.Filter.Trim()));
            }

            return items.Skip((parameters.Page - 1) * parameters.PageSize)
                            .Take(parameters.PageSize).Select(t => t.User);
        }

        public int GetTotal(string filter)
        {
            var items = _context.Teachers.AsQueryable();
            if (!String.IsNullOrWhiteSpace(filter))
            {
                items = items.Where(x => x.User.Name.Contains(filter.Trim()));
            }

            return items.Count();
        }

        public void AddTeacher(Teacher teacher)
        {
            if (_context.Teachers.Any(t => t.Id == teacher.Id))
            {
                throw new EntityDuplicateException("Teacher", teacher.Id);
            } 

            _context.Teachers.Add(teacher);
            _context.SaveChanges();
            var user = _context.Users.First(x => x.Id == teacher.Id);
            user.IsTeacher = true;
            _context.SaveChanges();
        }

        public Teacher GetTeacher(int teacherId)
        {
            var teacher = _context.Teachers
                .Where(t => t.Id == teacherId).Include(t => t.User).FirstOrDefault();

            if (teacher == null)
            {
                throw new EntityNotFoundException("Teacher", teacherId);
            }

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
