using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using crm_webapi.Models;
using AutoMapper;
using crm_webapi.Controllers.Users;
using crm_webapi.Repositories;
using crm_webapi.Exceptions;
using crm_webapi.Responses;

namespace crm_webapi.Controllers.Groups
{
    [Route("api/[controller]")]
    public class GroupTeacherController : Controller
    {
        private readonly IGroupTeacherRepository _repository;

        public GroupTeacherController(IGroupTeacherRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}/groups", Name = "GetTeacherGroups")]
        public IEnumerable<GroupApiModel> GetGroupsByTeacher(int id)
        {
            var groups = _repository.GetGroupsByTeacher(id);
            var result = Mapper.Map<GroupApiModel[]>(groups);

            return result;
        }

        [HttpGet("{id}/teachers", Name = "GetGroupTeachers")]
        public IEnumerable<UserApiModel> GetTeachersByGroup(int id)
        {
            var users = _repository.GetTeachersByGroup(id);
            var result = Mapper.Map<UserApiModel[]>(users);

            return result;
        }

        [HttpPost("{groupId}/{teacherId}")]
        public IActionResult AddGroupTeacher(int groupId, int teacherId)
        {
            _repository.AddGroupTeachers(groupId, teacherId);

            return new NoContentResult();
        }

        [HttpDelete("{groupId}/{teacherId}")]
        public IActionResult Delete(int groupId, int teacherId)
        {
            _repository.RemoveGroupTeacher(groupId, teacherId);
            return new NoContentResult();
        }

        [HttpGet("{id}/teachers/available", Name = "GetAvailableGroupTeachers")]
        public PagedResponse<UserApiModel> GetAvailableGroupTeachers(int id, [FromQuery] Parameters parameters)
        {      
            var teachers = _repository.GetAvailableTeachers(id, parameters);
            var count = _repository.GetTotalTeachers(id);

            var result = new PagedResponse<UserApiModel>(Mapper.Map<UserApiModel[]>(teachers), count);
            return result;
        }


        [HttpGet("{id}/groups/available", Name = "GetAvailableTeacherGroups")]
        public PagedResponse<GroupApiModel> GetAvailableTeacherGroups(int id, [FromQuery] Parameters parameters)
        {
            var groups = _repository.GetAvailableGroups(id,parameters);
            var count = _repository.GetTotalGroups(id);

            var result = new PagedResponse<GroupApiModel>(Mapper.Map<GroupApiModel[]>(groups), count);
            return result;
        }
    }
}
