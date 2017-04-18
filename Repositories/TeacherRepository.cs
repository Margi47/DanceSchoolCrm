using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace angular.Models
{
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
       
        public Group[][] GetAllGroups()
        {
            var teachers = _context.Teachers.ToList();
            var c = teachers.Count();
            var allGroups = new Group[c][];
            for (var i= 0; i<teachers.Count; i++)
            {
                var teacherGroups = new List<Group>();
                var groups = _context.GroupTeachers.Where(t => t.TeacherId == teachers[i].Id)
                    .Select(gr => gr.Group).ToList();

                foreach (var g in groups)
                {
                    teacherGroups.Add(g);
                }
                allGroups[i] = teacherGroups.ToArray();
            }

            return allGroups;
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

        /*public Group GetUserGroup(int groupId)
        {
            return Context.Groups.FirstOrDefault(g => g.Id == groupId);
        }

        public void AddGroup(int userId, int groupId)
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
