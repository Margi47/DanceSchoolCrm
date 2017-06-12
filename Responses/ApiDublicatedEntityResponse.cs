﻿using angular.Exceptions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Responses
{
    public class ApiDublicatedEntityResponse : ApiErrorResponse
    {
        public string Entity { get; set; }
        public int Id { get; set; }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int? SecondId { get; set; }

        public ApiDublicatedEntityResponse(string entity, int id, int? secondId = null)
            : base("Entity already exists")
        {
            Entity = entity;
            Id = id;
            SecondId = secondId;
        }
    }
}
