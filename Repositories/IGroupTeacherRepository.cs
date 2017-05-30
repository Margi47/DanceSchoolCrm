using angular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Repositories
{
    public interface IGroupTeacherRepository
    {
        IEnumerable<User> GetTeachersByGroup(int groupId);
        IEnumerable<Group> GetGroupsByTeacher(int teacherId);
        void AddGroupTeachers(int groupId, int[] teachers);
        void AddTeacherGroups(int teacherId, int[] groups);
        void RemoveGroupTeacher(int groupId, int teacherId);
        IEnumerable<User> GetAvailableTeachers(int id);
        IEnumerable<Group> GetAvailableGroups(int id);
    }
}
