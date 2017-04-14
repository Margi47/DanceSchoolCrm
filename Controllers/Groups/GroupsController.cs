using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.Models;
using AutoMapper;
using angular.Controllers.Users;

namespace angular.Controllers.Groups
{
    [Route("api/[controller]")]
    public class GroupsController : Controller
    {
        private readonly IGroupRepository _groupRepository;

        public GroupsController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        [HttpGet]
        public IEnumerable<GroupApiModel> GetAll()
        {
            var groups = _groupRepository.GetAll();
            var result = Mapper.Map<GroupApiModel[]>(groups);

            return result;
        }

        [HttpGet("{id}", Name = "GetGroup")]
        public IActionResult GetById(int id)
        {
            var group = _groupRepository.Find(id);
            if (group == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<GroupApiModel>(group);
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] GroupApiModel group)
        {
            if (group == null)
            {
                return BadRequest();
            }
            
            var result = Mapper.Map<GroupApiModel, Group>(group);
            _groupRepository.Add(result);

            return CreatedAtRoute("GetGroup", new { id = result.Id }, result );
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] GroupApiModel group)
        {
            if (group == null || group.Id != id)
            {
                return BadRequest();
            }
            
            var baseGroup = _groupRepository.Find(id);
            if (baseGroup == null)
            {
                return NotFound();
            }
           
            baseGroup.Name = group.Name;
            baseGroup.Description = group.Description;
            baseGroup.IsActive = group.IsActive;

            _groupRepository.Update(baseGroup);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var group = _groupRepository.Find(id);
            if (group == null)
            {
                return NotFound();
            }

            _groupRepository.Remove(id);
            return new NoContentResult();
        }

        [HttpGet("{groupId}/students")]
        public IEnumerable<UserApiModel> GetStudents(int groupId)
        {
            var users = _groupRepository.GetStudents(groupId);
            var result = Mapper.Map<UserApiModel[]>(users);

            return result;
        }

        [HttpPost("{groupId}/students/{userId}")]
        public IActionResult AddStudent(int groupId, int userId)
        {
            _groupRepository.AddStudent(groupId, userId);

            return new ObjectResult(Mapper.Map<UserApiModel>(_groupRepository.GetGroupUser(userId)));
        }

        [HttpDelete("{groupId}/students/{userId}")]
        public IActionResult RemoveStudent(int groupId, int userId)
        {
            _groupRepository.RemoveStudent(groupId, userId);
            return new NoContentResult();
        }
    }
}
