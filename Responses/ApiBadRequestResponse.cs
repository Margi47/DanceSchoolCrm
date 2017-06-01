using angular.Exceptions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Responses
{
    public class ApiBadRequestResponse : ApiResponse
    {
        public ModelInvalidException ResultException { get; }

        public ApiBadRequestResponse(ModelStateDictionary modelState)
            : base(400)
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

             ResultException = new ModelInvalidException(result);
                /*modelState.SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage).ToArray();*/
        }
    }
}
