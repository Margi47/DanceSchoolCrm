using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace angular.Models
{
    public abstract class CrudRepository<T> : ICrudRepository<T> where T: class 
    {
        private readonly CrmContext _context;

        public CrudRepository(CrmContext context)
        {
            _context = context;
        }

        public void Add(T item)
        {
            var items = GetQuery(_context);
            items. Add(item);
            _context.SaveChanges();
        }

        public T Find(int key)
        {
            var items = GetQuery(_context);
            return items.FirstOrDefault(GetExpression(key));
        }

        public IEnumerable<T> GetAll()
        {
            var items = GetQuery(_context);
            return items.ToList();
        }

        public void Remove(int key)
        {
            var items = GetQuery(_context);
            var entity = items.First(GetExpression(key));
            items.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(T item)
        {
            var items = GetQuery(_context);
            items.Update(item);
            _context.SaveChanges();
        }

        public abstract DbSet<T> GetQuery(CrmContext context);

        public abstract Func<T,bool> GetExpression(int key);
    }
}
