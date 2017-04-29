using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface IGroupRepository: ICrudRepository<Group>
    {
        User GetUser(int userId);
        IEnumerable<User> GetTeachers(int groupId);
        void AddTeachers(int groupId, int[] teachers);
        void RemoveTeacher(int groupId, int teacherId);
    }
}
