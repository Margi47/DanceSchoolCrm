using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Exceptions
{
    public class ModelInvalidException : DataValidationException
    {
        public IDictionary<string, List<string>> Errors { get; set; }

        public ModelInvalidException(IDictionary<string, List<string>> errors)
        {
            Errors = errors;
        }
    }
}
