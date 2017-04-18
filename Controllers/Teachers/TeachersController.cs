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
    public class TeachersController : Controller
    {
        private readonly ITeacherRepository _teacherRepository;

        public TeachersController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        [HttpGet]
        public IEnumerable<TeacherApiModel> GetAll()
        {
            var teachers = _teacherRepository.GetAllUsers();
            var result = Mapper.Map<TeacherApiModel[]>(teachers);

            return result;
        }

        [HttpGet("groups")]
        public IActionResult GetGroups()
        {
            var groups = _teacherRepository.GetAllGroups();
            if (groups == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<GroupApiModel[][]>(groups);
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TeacherApiModel teacher)
        {
            if (teacher == null)
            {
                return BadRequest();
            }

            var result = Mapper.Map<Teacher>(teacher);
            _teacherRepository.AddTeacher(result);

            return CreatedAtRoute("GetTeacher", new { id = result.Id }, result);
        }


        [HttpPost("teacher/{teacherId}/groups")]
        public IActionResult AddGroup(int teacherId, [FromBody] int[] groups)
        {
            _teacherRepository.AddGroup(teacherId, groups);

            return new NoContentResult();
        }


        [HttpGet("user/{id}", Name = "GetTeacher")]
        public IActionResult GetTeacher(int id)
        {

            return new ObjectResult(null);
        }

        /*


        [HttpPost]
        public IActionResult Create([FromBody] TeacherApiModel teacher)
        {
            if (teacher == null)
            {
                return BadRequest();
            }
            
            var result = Mapper.Map<Teacher>(teacher);
            _teacherRepository.Add(result);

            return CreatedAtRoute("GetTeacher", new { id = result.UserInfoId }, result );
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] TeacherApiModel teacher)
        {
            if (teacher == null || teacher.Id != id)
            {
                return BadRequest();
            }
            
            var baseTeacher = _teacherRepository.Find(id);
            if (baseTeacher == null)
            {
                return NotFound();
            }
           
            baseTeacher.UserInfo = Mapper.Map<User>(teacher);

            _teacherRepository.Update(baseTeacher);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var teacher = _teacherRepository.Find(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _teacherRepository.Remove(id);
            return new NoContentResult();
        }

        [HttpGet("{id}/groups", Name = "GetUserGroups")]
        public IActionResult GetGroups(int id)
        {
            var groups = _teacherRepository.GetGroups(id);
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
            _teacherRepository.AddGroup(userId, groupId);

            return new ObjectResult(Mapper.Map<GroupApiModel>(_teacherRepository.GetUserGroup(groupId)));
        }

        [HttpDelete("{userId}/groups/{groupId}")]
        public IActionResult RemoveGroup(int userId, int groupId)
        {
            _teacherRepository.RemoveGroup(userId, groupId);
            return new NoContentResult();
        }*/
    }
}
