using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public class GroupRepository : IGroupRepository
    {
        private readonly CrmContext _context;

        public GroupRepository(CrmContext context)
        {
            _context = context;
        }

        public void Add(Group group)
        {
            _context.Groups.Add(group);
            _context.SaveChanges();
        }

        public Group Find(int key)
        {
            return _context.Groups.FirstOrDefault(u => u.Id == key);
        }

        public IEnumerable<Group> GetAll()
        {
            return _context.Groups.ToList();
        }

        public void Remove(int key)
        {
            var entity = _context.Groups.First(u => u.Id == key);
            _context.Groups.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Group group)
        {
            _context.Groups.Update(group);
            _context.SaveChanges();
        }
    }
}
