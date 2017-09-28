using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public interface IEntity
    {
        int Id { get; }
        string Name { get; }
    }
}
