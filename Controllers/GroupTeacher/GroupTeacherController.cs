using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.Models;
using AutoMapper;
using angular.Controllers.Users;
using angular.Repositories;
using angular.Exceptions;
using angular.Responses;

namespace angular.Controllers.Groups
{
    [HandleException]
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
        public IEnumerable<UserApiModel> GetAvailableGroupTeachers(int id)
        {
            var teachers = _repository.GetAvailableTeachers(id);

            var result = Mapper.Map<UserApiModel[]>(teachers);
            return result;
        }


        [HttpGet("{id}/groups/available", Name = "GetAvailableTeacherGroups")]
        public IEnumerable<GroupApiModel> GetAvailableTeacherGroups(int id)
        {
            var groups = _repository.GetAvailableGroups(id);

            var result = Mapper.Map<GroupApiModel[]>(groups);
            return result;
        }
    }
}
