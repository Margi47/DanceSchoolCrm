using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public class CrmContext: DbContext
    {
        public CrmContext(DbContextOptions<CrmContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
