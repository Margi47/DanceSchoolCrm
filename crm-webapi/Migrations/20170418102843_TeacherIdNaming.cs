using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular.Migrations
{
    public partial class TeacherIdNaming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Teachers",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Users_Id",
                table: "Teachers",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_Id",
                table: "Teachers");

            migrationBuilder.RenameColumn(
                name: "Id",
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
    }
}
