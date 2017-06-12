using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using angular.Exceptions;

namespace angular.Models
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

        public IEnumerable<T> GetAll()
        {
            var items = GetQuery(Context);
            return items.ToList();
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
