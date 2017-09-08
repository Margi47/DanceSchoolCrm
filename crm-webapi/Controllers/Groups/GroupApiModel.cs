using crm_webapi.Controllers.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Controllers.Groups
{
    public class GroupApiModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
        [MaxLength(70)]
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
