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
        TeacherDto GetTeacher(int teacherId);
        Group[] GetTeacherGroups(int teacherId);
        Group GetGroup(int groupId);

        void AddTeacher(Teacher teacher);
        void AddGroups(int teacherId, int[] groups); 
        
        void RemoveTeacher(int id);     
        void RemoveGroup(int teacherId, int groupId);
    }
}
