using crm_webapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Repositories
{
    public interface IGroupTeacherRepository
    {
        IEnumerable<User> GetTeachersByGroup(int groupId);
        IEnumerable<Group> GetGroupsByTeacher(int teacherId);
        void AddGroupTeachers(int groupId, int teacherId);
        void RemoveGroupTeacher(int groupId, int teacherId);
        IEnumerable<User> GetAvailableTeachers(int id, Parameters parameters);
        IEnumerable<Group> GetAvailableGroups(int id, Parameters parameters);
        int GetTotalTeachers(int groupId, string filter);
        int GetTotalGroups(int teacherId, string filter);
    }
}
