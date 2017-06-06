using angular.Exceptions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Responses
{
    public class ApiBadRequestResponse : ApiErrorResponse
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Dictionary<string, List<string>> Result { get; }

        public ApiBadRequestResponse(ModelStateDictionary modelState)
            : base("Bad request")
        {
            if (modelState.IsValid)
            {
                throw new ArgumentException("ModelState must be invalid", nameof(modelState));
            }

            var result = new Dictionary<string, List<string>>();
            foreach (var e in modelState)
            {
                result.Add(e.Key, e.Value.Errors.Select(x => x.ErrorMessage).ToList());
            }

             Result = result;
        }

        public ApiBadRequestResponse(string message)
            : base(message)
        { }
    }
}
