﻿using System;
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
    [ApiValidation]
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

        [HttpPost]
        public IActionResult Create([FromBody] TeacherApiModel teacher)
        {
            if (teacher == null)
            {
                throw new BadRequestException("Teacher data was not provided");
            }

            var result = Mapper.Map<Teacher>(teacher);
            _teacherRepository.AddTeacher(result);

            return CreatedAtRoute("GetTeacher", new { id = result.Id }, null);
        }

        [HttpGet("{id}", Name = "GetTeacher")]
        public IActionResult GetTeacher(int id)
        {
            var teacher = _teacherRepository.GetTeacher(id);

            var result = Mapper.Map<TeacherApiModel>(teacher);
            return new ObjectResult(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var teacher = _teacherRepository.GetTeacher(id);

            _teacherRepository.RemoveTeacher(teacher);
            return new NoContentResult();
        }
    }
}
