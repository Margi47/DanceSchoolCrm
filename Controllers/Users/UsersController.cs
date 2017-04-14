using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.Models;
using AutoMapper;
using angular.Controllers.Groups;

namespace angular.Controllers.Users
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IEnumerable<UserApiModel> GetAll()
        {
            var users = _userRepository.GetAll();
            var result = Mapper.Map<UserApiModel[]>(users);

            return result;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            var user = _userRepository.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<UserApiModel>(user);
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserApiModel user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            
            var result = Mapper.Map<UserApiModel, User>(user);
            _userRepository.Add(result);

            return CreatedAtRoute("GetUser", new { id = result.Id }, result );
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserApiModel user)
        {
            if (user == null || user.Id != id)
            {
                return BadRequest();
            }
            
            var baseUser = _userRepository.Find(id);
            if (baseUser == null)
            {
                return NotFound();
            }
           
            baseUser.Name = user.Name;
            baseUser.Phone = user.Phone;
            baseUser.Email = user.Email;
            baseUser.IsActive = user.IsActive;
            baseUser.IsAdmin = user.IsAdmin;
            baseUser.IsTeacher = user.IsTeacher;

            _userRepository.Update(baseUser);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _userRepository.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _userRepository.Remove(id);
            return new NoContentResult();
        }

        [HttpGet("{id}/groups", Name = "GetUserGroups")]
        public IActionResult GetGroups(int id)
        {
            var groups = _userRepository.GetGroups(id);
            if (groups == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<IList<GroupApiModel>>(groups);
            return new ObjectResult(result);
        }

        [HttpPost("{userId}/groups/{groupId}")]
        public IActionResult AddGroup(int userId, int groupId)
        {
            _userRepository.AddGroup(userId, groupId);

            return new ObjectResult(Mapper.Map<GroupApiModel>(_userRepository.GetUserGroup(groupId)));
        }

        [HttpDelete("{userId}/groups/{groupId}")]
        public IActionResult RemoveGroup(int userId, int groupId)
        {
            _userRepository.RemoveGroup(userId, groupId);
            return new NoContentResult();
        }
    }
}
