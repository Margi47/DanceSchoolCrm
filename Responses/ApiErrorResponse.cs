using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Responses
{
    public class ApiErrorResponse
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; }

        public ApiErrorResponse(string message)
        {
            Message = message;
        }
    }
}

