using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using crm_webapi.Models;
using AutoMapper;
using crm_webapi.Controllers.Groups;
using crm_webapi.Responses;
using crm_webapi.Exceptions;
using Serilog;
using Microsoft.Extensions.Logging;

namespace crm_webapi.Controllers.Users
{
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
        public PagedResponse<UserApiModel> GetAll([FromQuery] Parameters parameters)
        {
            var users = _userRepository.GetAll(parameters);
            var count = _userRepository.GetTotal(parameters.Filter);
            var result = new PagedResponse<UserApiModel>(Mapper.Map<UserApiModel[]>(users), count, parameters.Filter);

            return result;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            var user = _userRepository.Find(id);

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
                throw new BadRequestException("User data doesn`t match provided id.");
            }

            var baseUser = _userRepository.Find(id);
           
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
            _userRepository.Remove(user);
            
            return new NoContentResult();
        }

        [HttpGet("teachers/available", Name = "GetAvailableTeachers")]
        public PagedResponse<UserApiModel> GetAvailableTeachers([FromQuery] Parameters parameters)
        {
            var users = _userRepository.GetAvailableTeachers(parameters);
            var count = _userRepository.CountTeachers(parameters.Filter);

            var result = new PagedResponse<UserApiModel>(Mapper.Map<UserApiModel[]>(users), count, parameters.Filter);

            return result;
        }
    }
}
