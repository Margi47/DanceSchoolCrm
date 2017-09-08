using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public interface ITeacherRepository
    {
        IEnumerable<User> GetTeachers(Parameters parameters);
        int GetTotal();
        Teacher GetTeacher(int teacherId);
        void AddTeacher(Teacher teacher);
        void RemoveTeacher(Teacher item);
    }
}
