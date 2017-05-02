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
        public IEnumerable<TeacherApiModel> GetTeachers()
        {
            var teachers = _teacherRepository.GetTeachers();
            var result = Mapper.Map<TeacherApiModel[]>(teachers);

            return result;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var teachers = _teacherRepository.GetAllTeachersInfo();
            if (teachers == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<TeacherApiModel[]>(teachers);
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

            return CreatedAtRoute("GetTeacher", new { id = result.Id }, null);
        }

        [HttpGet("{id}", Name = "GetTeacher")]
        public IActionResult GetTeacher(int id)
        {
            var teacher = _teacherRepository.GetTeacher(id);
             if(teacher == null)
            {
                return NotFound();
            }

            var result = Mapper.Map<TeacherApiModel>(teacher);
            return new ObjectResult(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var teacher = _teacherRepository.GetTeacher(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _teacherRepository.RemoveTeacher(id);
            return new NoContentResult();
        }
    }
}
