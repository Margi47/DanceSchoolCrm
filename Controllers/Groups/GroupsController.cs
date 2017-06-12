using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.Models;
using AutoMapper;
using angular.Controllers.Users;
using angular.Exceptions;
using angular.Responses;

namespace angular.Controllers.Groups
{
    [ApiValidation]
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

            var result = Mapper.Map<GroupApiModel>(group);
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] GroupApiModel group)
        {
            if (group == null)
            {
                throw new BadRequestException("Group data was not provided");
            }

            var result = Mapper.Map<GroupApiModel, Group>(group);
            _groupRepository.Add(result);

            return CreatedAtRoute("GetGroup", new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] GroupApiModel group)
        {
            if (group == null)
            {
                throw new BadRequestException("Group data was not provided");
            }

            if (group.Id != id)
            {
                throw new BadRequestException("Group data data doesn`t match provided id.");
            }

            var baseGroup = _groupRepository.Find(id);

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

            _groupRepository.Remove(group);
            return new NoContentResult();
        }
    }
}
