using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public class GroupTeachers
    {
        public int GroupId { get; set; }
        public Group Group { get; set; }

        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }
    }
}
