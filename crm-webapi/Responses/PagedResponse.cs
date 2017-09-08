using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Responses
{
    public class PagedResponse<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int Total { get; set; }

        public PagedResponse(IEnumerable<T> data, int total)
        {
            Data = data;
            Total = total;
        }
    }
}

