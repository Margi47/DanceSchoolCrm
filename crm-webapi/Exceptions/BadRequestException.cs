using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Exceptions
{
    public class BadRequestException : DataValidationException
    {
        public string ErrorMessage { get; set; }

        public BadRequestException(string message)
        {
            ErrorMessage = message;
        }
    }
}
