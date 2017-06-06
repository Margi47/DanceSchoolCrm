using angular.Exceptions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Responses
{
    public class ApiEntityNotFoundResponse : ApiErrorResponse
    {
        public string Entity { get; set; }
        public int Id { get; set; }

        public ApiEntityNotFoundResponse(string message, string entity, int id)
            : base(message)
        {
            Entity = entity;
            Id = id;
        }
    }
}
