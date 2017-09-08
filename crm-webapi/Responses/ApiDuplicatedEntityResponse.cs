using crm_webapi.Exceptions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Responses
{
    public class ApiDuplicatedEntityResponse : ApiErrorResponse
    {
        public string Entity { get; set; }
        public int Id { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int? SecondId { get; set; }

        public ApiDuplicatedEntityResponse(string entity, int id, int? secondId = null)
            : base("Entity already exists")
        {
            Entity = entity;
            Id = id;
            SecondId = secondId;
        }
    }
}
