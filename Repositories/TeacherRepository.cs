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
        }

        public Group[] AddGroups(int teacherId, int[] groups)
        {
            foreach (var g in groups)
            {
                if (!_context.GroupTeachers.Any(x => x.TeacherId == teacherId && x.GroupId == g))
                {
                    _context.GroupTeachers.Add(new GroupTeachers { GroupId = g, TeacherId = teacherId });
                }
            }
            _context.SaveChanges();

            var groupItems = new List<Group>();
            foreach(var g in groups)
            {
                groupItems.Add(GetGroup(g));
            }
            return groupItems.ToArray();
        }

        public TeacherDto GetTeacher(int teacherId)
        {
            var user = _context.Teachers
                .Where(t => t.Id == teacherId)
                .Select(t => t.User).First();
            var groups = _context.GroupTeachers
                .Where(g => g.TeacherId == user.Id)
                .Select(g => g.Group).ToArray();

            var teacherDto = new TeacherDto
            {
                Teacher = user,
                Groups = groups
            };

            return teacherDto;
        }

        public void RemoveTeacher(int id)
        {
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
