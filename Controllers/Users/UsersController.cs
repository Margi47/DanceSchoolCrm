using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular.Models;
using AutoMapper;
using angular.Controllers.Groups;
using angular.Responses;
using angular.Exceptions;

namespace angular.Controllers.Users
{
    [HandleException]
    [ApiValidation]
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
                throw new EntityNotFoundException("User", id);
            }

            var result = Mapper.Map<UserApiModel>(user);
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserApiModel user)
        {
            if (user == null)
            {
                throw new BadRequestException("User data was not provided");
            }
            
            var result = Mapper.Map<UserApiModel, User>(user);
            _userRepository.Add(result);

            //?
            return CreatedAtRoute("GetUser", new { id = result.Id }, result );
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserApiModel user)
        {
            if (user == null)
            {
                throw new BadRequestException("User data was not provided");
            }

            if (user.Id != id)
            {
                throw new BadRequestException("User data has diferent 'id' field");
            }

            var baseUser = _userRepository.Find(id);
            if (baseUser == null)
            {
                throw new EntityNotFoundException("User", id);
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
                throw new EntityNotFoundException("User", id);
            }

            _userRepository.Remove(user);
            
            return new NoContentResult();
        }

        [HttpGet("teachers/available", Name = "GetAvailableTeachers")]
        public IEnumerable<UserApiModel> GetAvailableTeachers()
        {
            var users = _userRepository.GetAvailableTeachers();
            var result = Mapper.Map<UserApiModel[]>(users);

            return result;
        }
    }
}
