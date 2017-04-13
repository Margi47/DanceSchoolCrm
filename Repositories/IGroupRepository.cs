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
        User GetGroupUser(int userId);
    }
}
