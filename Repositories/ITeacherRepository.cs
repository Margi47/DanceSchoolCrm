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
        void AddTeacher(Teacher teacher);
        void RemoveTeacher(int id);
    }
}
