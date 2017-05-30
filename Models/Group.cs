using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public class Group
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MinLength(4)]
        [MaxLength(25)]
        public string Name { get; set; }
        [MaxLength(70)]
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public List<GroupUser> Students { get; set; }
        public List<GroupTeachers> Teachers { get; set; }
    }
}
