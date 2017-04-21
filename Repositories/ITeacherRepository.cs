using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface ITeacherRepository
    {
        IEnumerable<User> GetTeachers();
        IEnumerable<TeacherDto> GetAllTeachersInfo();
        void AddTeacher(Teacher teacher);
        Group[] AddGroups(int teacherId, int[] groups);
        TeacherDto GetTeacher(int teacherId);
        void RemoveTeacher(int id);
        Group GetGroup(int groupId);
        void RemoveGroup(int teacherId, int groupId);
    }
}
