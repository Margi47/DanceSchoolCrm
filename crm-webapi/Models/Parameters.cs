using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public class Parameters
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
