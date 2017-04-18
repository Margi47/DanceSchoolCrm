using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Teachers.Select(t => t.User);
        }

        public IEnumerable<TeacherDto> GetAllTeacherGroups()
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
        }

        public void AddGroup(int teacherId, int[] groups)
        {
            foreach (var g in groups)
            {
                _context.GroupTeachers.Add(new GroupTeachers { GroupId = g, TeacherId = teacherId });
            }
            _context.SaveChanges();
        }

        public User GetTeacher(int teacherId)
        {
            return _context.Teachers.Where(t => t.Id == teacherId).Select(t => t.User).First();
        }

        public Group[] GetTeacherGroups(int teacherId)
        {
            return _context.GroupTeachers.Where(t => t.TeacherId == teacherId)
                .Select(t => t.Group).ToArray();
        }

        /*public void AddGroup(int userId, int groupId)
        {
            if (!Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                Context.GroupUser.Add(new GroupUser { GroupId = groupId, UserId = userId });
                Context.SaveChanges();
            }
        }

        public void RemoveGroup(int userId, int groupId)
        {
            if (Context.GroupUser.Any(x => x.UserId == userId && x.GroupId == groupId))
            {
                var entity = Context.GroupUser.First(g => g.GroupId == groupId && g.UserId == userId);

                Context.GroupUser.Remove(entity);
                Context.SaveChanges();
            }
        }*/

    }
}
