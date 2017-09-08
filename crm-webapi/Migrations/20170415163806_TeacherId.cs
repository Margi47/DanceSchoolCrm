using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace angular.Migrations
{
    public partial class TeacherId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupTeachers_Teachers_TeacherId",
                table: "GroupTeachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teachers",
                table: "Teachers");

            migrationBuilder.DropIndex(
                name: "IX_Teachers_UserInfoId",
                table: "Teachers");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Teachers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teachers",
                table: "Teachers",
                column: "UserInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupTeachers_Teachers_TeacherId",
                table: "GroupTeachers",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "UserInfoId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupTeachers_Teachers_TeacherId",
                table: "GroupTeachers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teachers",
                table: "Teachers");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Teachers",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teachers",
                table: "Teachers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_UserInfoId",
                table: "Teachers",
                column: "UserInfoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupTeachers_Teachers_TeacherId",
                table: "GroupTeachers",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
