using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface IGroupRepository
    {
        void Add(Group group);
        IEnumerable<Group> GetAll();
        Group Find(int key);
        void Remove(int key);
        void Update(Group group);
    }
}
