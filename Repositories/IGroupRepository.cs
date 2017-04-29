using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface IGroupRepository: ICrudRepository<Group>
    {
        User GetGroupUser(int userId);
    }
}
