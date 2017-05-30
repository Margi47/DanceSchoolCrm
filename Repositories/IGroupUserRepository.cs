using angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Repositories
{
    public interface IGroupUserRepository
    {
        IEnumerable<Group> GetGroupsByUser(int id);
        IEnumerable<User> GetStudentsByGroup(int groupId);
        void AddGroupUser(int userId, int groupId);
        void RemoveGroupUser(int userId, int groupId);
        IEnumerable<User> GetAvailableStudents(int id);
        IEnumerable<Group> GetAvailableGroups(int id);
    }
}
