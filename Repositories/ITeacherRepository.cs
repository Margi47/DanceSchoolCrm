﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public interface ITeacherRepository
    {
        IEnumerable<User> GetAllUsers();
        IEnumerable<TeacherDto> GetAllTeacherGroups();
        void AddTeacher(Teacher teacher);
        void AddGroup(int teacherId, int[] groups);
        User GetTeacher(int teacherId);
        Group[] GetTeacherGroups(int teacherId);
    }
}
