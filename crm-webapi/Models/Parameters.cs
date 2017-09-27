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
        [Range(1, int.MaxValue)]
        public int Page { get; set; }
        [Range(1, int.MaxValue)]
        public int PageSize { get; set; }
    }
}
