using angular.Controllers.Groups;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Controllers.Users
{
    public class TeacherApiModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GroupApiModel[] Groups { get; set; }
    }
}
