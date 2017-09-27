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
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserRepository userRepository, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpGet]
        public PagedResponse<UserApiModel> GetAll([FromQuery] Parameters parameters)
        {
            _logger.LogInformation("Getting users for page {Page}, page size={Size}", parameters.Page, parameters.PageSize);

            if(parameters.Page == 0 || parameters.PageSize == 0)
            {
                throw new BadRequestException("Page parameters were not provided");
            }

            var users = _userRepository.GetAll(parameters);
            var count = _userRepository.GetTotal();
            var result = new PagedResponse<UserApiModel>(Mapper.Map<UserApiModel[]>(users), count);

            return result;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("Getting user with id {Id}", id);

            var user = _userRepository.Find(id);

            var result = Mapper.Map<UserApiModel>(user);
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserApiModel user)
        {
            _logger.LogInformation("Adding new user");

            if (user == null)
            {
                throw new BadRequestException("User data was not provided");
            }
            
            var result = Mapper.Map<UserApiModel, User>(user);
            _userRepository.Add(result);

            _logger.LogInformation("Added user with id={Id} and name={name}", result.Id, result.Name);
            return CreatedAtRoute("GetUser", new { id = result.Id }, result );
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserApiModel user)
        {
            _logger.LogInformation("Updaiting user data with id={Id}", id);

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

            _logger.LogInformation("User with id={Id} updated. New state: name={Name}, phone={Phone}, email={Email}, " +
                "isActive={IsActive}, isAdmin={IsAdmin}, isTeacher={IsTeacher}.",
                baseUser.Name, baseUser.Phone, baseUser.Email, baseUser.IsActive, baseUser.IsAdmin, baseUser.IsTeacher);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("Deleting user with id={Id}", id);

            var user = _userRepository.Find(id);
            _userRepository.Remove(user);
            
            return new NoContentResult();
        }

        [HttpGet("teachers/available", Name = "GetAvailableTeachers")]
        public PagedResponse<UserApiModel> GetAvailableTeachers([FromQuery] Parameters parameters)
        {
            _logger.LogInformation("Getting available teachers for page {Page}, page size={Size}",
                parameters.Page, parameters.PageSize);

            var users = _userRepository.GetAvailableTeachers(parameters);
            var count = _userRepository.CountTeachers(parameters);

            var result = new PagedResponse<UserApiModel>(Mapper.Map<UserApiModel[]>(users), count);

            return result;
        }
    }
}
