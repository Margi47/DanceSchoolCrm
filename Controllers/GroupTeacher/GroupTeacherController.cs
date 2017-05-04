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

        [HttpPost("{groupId}/teachers")]
        public IActionResult AddTeachersToGroup(int groupId, [FromBody] int[] teachers)
        {
            _repository.AddGroupTeachers(groupId, teachers);

            return new NoContentResult();
        }

        [HttpPost("{teacherId}/groups")]
        public IActionResult AddGroupsToTeacher(int teacherId, [FromBody] int[] groups)
        {
            _repository.AddTeacherGroups(teacherId, groups);

            return new NoContentResult();
        }

        [HttpDelete("{groupId}/{teacherId}")]
        public IActionResult Delete(int groupId, int teacherId)
        {
            _repository.RemoveGroupTeacher(groupId, teacherId);
            return new NoContentResult();
        }
    }
}
