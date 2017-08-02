using angular.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceSchoolCrm.Repositories
{
    public static class QueryExtensions
    {
        public static IQueryable<T> FilterDeleted<T>(this IQueryable<T> query)
        {
            return query.Where(i => EF.Property<bool>(i, "IsDeleted") == false);
        }
    }
}
