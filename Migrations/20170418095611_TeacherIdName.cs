using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular.Migrations
{
    public partial class TeacherIdName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_UserInfoId",
                table: "Teachers");

            migrationBuilder.RenameColumn(
                name: "UserInfoId",
                table: "Teachers",
                newName: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Teachers",
                newName: "UserInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Users_UserInfoId",
                table: "Teachers",
                column: "UserInfoId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
