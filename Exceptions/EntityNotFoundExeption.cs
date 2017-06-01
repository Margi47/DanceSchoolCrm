using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Exceptions
{
    public class EntityNotFoundException : DataValidationException
    {
        public string Entity { get; set; }
        public int Id { get; set; }

        public EntityNotFoundException(string entityName, int id)
        {
            Entity = entityName;
            Id = id;
        }
    }
}
