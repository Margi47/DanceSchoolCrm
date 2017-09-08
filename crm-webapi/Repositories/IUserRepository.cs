using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public interface IUserRepository: ICrudRepository<User>
    {
        User[] GetAvailableTeachers(Parameters parameters);
        int CountTeachers(Parameters parameters);
    }
}
