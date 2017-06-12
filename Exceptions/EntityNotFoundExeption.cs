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
        public int? SecondId { get; set; }

        public EntityNotFoundException(string entityName, int firstId, int? secondId = null)
        {
            Entity = entityName;
            Id = firstId;
            SecondId = secondId;
        }
    }
}
