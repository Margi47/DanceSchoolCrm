using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Exceptions
{
    public class EntityDublicateException : DataValidationException
    {
        public string Entity { get; set; }
        public int Id { get; set; }
        public int[] SecondId { get; set; }

        public EntityDublicateException(string entityName, int firstId, int[] secondId = null)
        {
            Entity = entityName;
            Id = firstId;
            SecondId = secondId;
        }
    }
}
