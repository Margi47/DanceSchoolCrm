using crm_webapi.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public interface ICrudRepository<T>
    {
        void Add(T item);
        IEnumerable<T> GetAll(Parameters parameters);
        int GetTotal();
        T Find(int key);
        void Remove(T item);
        void Update(T item);
    }
}
