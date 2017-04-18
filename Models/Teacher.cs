using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }
        public List<GroupTeachers> Groups { get; set; }
        //public List<string> Styles { get; set; }
    }
}
