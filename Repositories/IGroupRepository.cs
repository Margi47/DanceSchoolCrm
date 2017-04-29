using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface IGroupRepository: ICrudRepository<Group>
    {
        IEnumerable<User> GetStudents(int groupId);
        void AddStudent(int groupId, int userId);
        User GetUser(int userId);
        void RemoveStudent(int groupId, int userId);
        IEnumerable<User> GetTeachers(int groupId);
        void AddTeachers(int groupId, int[] teachers);
        void RemoveTeacher(int groupId, int teacherId);
    }
}
