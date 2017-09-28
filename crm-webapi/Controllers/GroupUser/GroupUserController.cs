using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using crm_webapi.Models;
using AutoMapper;
using crm_webapi.Controllers.Users;
using crm_webapi.Repositories;
using crm_webapi.Responses;

namespace crm_webapi.Controllers.Groups
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

        [HttpGet("{id}/groups/available", Name = "GetAvailableGroups")]
        public PagedResponse<GroupApiModel> GetAvailableGroups(int id, [FromQuery] Parameters parameters)
        {          
            var count = _repository.GetTotalGroups(id, parameters.Filter);
            var groups = _repository.GetAvailableGroups(id, parameters);

            var result = new PagedResponse<GroupApiModel>(Mapper.Map<GroupApiModel[]>(groups), count);
            return result;
        }

        [HttpGet("{id}/students/available", Name = "GetAvailableStudents")]
        public PagedResponse<UserApiModel> GetAvailableStudents(int id, [FromQuery] Parameters parameters)
        {
            var count = _repository.GetTotalStudents(id, parameters.Filter);
            var students = _repository.GetAvailableStudents(id, parameters);

            var result = new PagedResponse<UserApiModel>(Mapper.Map<UserApiModel[]>(students), count);
            return result;
        }
    }
}
