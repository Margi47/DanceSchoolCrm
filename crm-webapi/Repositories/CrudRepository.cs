using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using crm_webapi.Exceptions;
using crm_webapi.Responses;

namespace crm_webapi.Models
{
    public abstract class CrudRepository<T> : ICrudRepository<T> where T: class 
    {
        protected readonly CrmContext Context;

        public CrudRepository(CrmContext context)
        {
            Context = context;
        }

        public void Add(T item)
        {
            var items = GetQuery(Context);
            items. Add(item);
            Context.SaveChanges();
        }

        public T Find(int key)
        {
            var items = GetQuery(Context);
            var result = items.FirstOrDefault(GetExpression(key));

            if(result == null)
            {
                throw new EntityNotFoundException(typeof(T).Name, key);
            }

            return result;
        }

        public IEnumerable<T> GetAll(Parameters parameters)
        {
            var items = GetQuery(Context);
            var data = items.Skip((parameters.Page - 1) * parameters.PageSize)
                            .Take(parameters.PageSize).ToList();
            return data;
        }

        public int GetTotal()
        {
            return GetQuery(Context).Count();
        }

        public void Remove(T item)
        {
            var items = GetQuery(Context);
            items.Remove(item);
            Context.SaveChanges();
        }

        public void Update(T item)
        {
            var items = GetQuery(Context);
            items.Update(item);
            Context.SaveChanges();
        }

        public abstract DbSet<T> GetQuery(CrmContext context);

        public abstract Func<T,bool> GetExpression(int key);
    }
}
