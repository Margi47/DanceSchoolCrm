using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.Models;
using AutoMapper;
using angular.Controllers.Users;
using angular.Repositories;

namespace angular.Controllers.Groups
{
    [Route("api/[controller]")]
    public class GroupUserController : Controller
    {
        private readonly IGroupUserRepository _repository;

        public GroupUserController(IGroupUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}/groups", Name = "GetGroups")]
        public IEnumerable<GroupApiModel> GetGroupsByUser(int id)
        {
            var groups = _repository.GetGroupsByUser(id);
            var result = Mapper.Map<GroupApiModel[]>(groups);

            return result;
        }

        [HttpGet("{id}/users", Name = "GetUsers")]
        public IEnumerable<UserApiModel> GetUsersByGroup(int id)
        {
            var users = _repository.GetStudentsByGroup(id);
            var result = Mapper.Map<UserApiModel[]>(users);

            return result;
        }

        [HttpPost("{userId}/{groupId}")]
        public IActionResult Create( int userId, int groupId)
        {
            _repository.AddGroupUser(userId, groupId);

            return new NoContentResult();
        }

        [HttpDelete("{userId}/{groupId}")]
        public IActionResult Delete(int userId, int groupId)
        {
            _repository.RemoveGroupUser(userId, groupId);
            return new NoContentResult();
        }
    }
}
