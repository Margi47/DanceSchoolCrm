using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface IUserRepository: ICrudRepository<User>
    {
        IEnumerable<Group> GetGroups(int id);
        void AddGroup(int userId, int groupId);
        Group GetUserGroup(int groupId);
    }
}
