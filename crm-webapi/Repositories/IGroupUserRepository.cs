using crm_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Repositories
{
    public interface IGroupUserRepository
    {
        IEnumerable<Group> GetGroupsByUser(int id);
        IEnumerable<User> GetStudentsByGroup(int groupId);
        void AddGroupUser(int userId, int groupId);
        void RemoveGroupUser(int userId, int groupId);
        IEnumerable<User> GetAvailableStudents(int id, Parameters parameters);
        IEnumerable<Group> GetAvailableGroups(int id, Parameters parameters);
        int GetTotalStudents(int groupId, string filter);
        int GetTotalGroups(int userId, string filter);
    }
}
