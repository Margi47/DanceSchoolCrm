using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using angular.Models;

namespace angular.Migrations
{
    [DbContext(typeof(CrmContext))]
    [Migration("20170404181009_Groups-Users")]
    partial class GroupsUsers
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("angular.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("IsActive");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("angular.Models.GroupUser", b =>
                {
                    b.Property<int>("GroupId");

                    b.Property<int>("UserId");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("angular.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsAdmin");

                    b.Property<bool>("IsTeacher");

                    b.Property<string>("Name");

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("angular.Models.GroupUser", b =>
                {
                    b.HasOne("angular.Models.Group", "Group")
                        .WithMany("Users")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("angular.Models.User", "User")
                        .WithMany("Groups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
