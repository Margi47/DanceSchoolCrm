using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular.Migrations
{
    public partial class GroupsUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupUser",
                columns: table => new
                {
                    GroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupUser", x => new { x.GroupId, x.UserId });
                    table.ForeignKey(
                        name: "FK_GroupUser_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupUser_UserId",
                table: "GroupUser",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupUser");
        }
    }
}
