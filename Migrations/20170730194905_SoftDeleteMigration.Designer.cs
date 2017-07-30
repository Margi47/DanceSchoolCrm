using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using angular.Models;

namespace angular.Migrations
{
    [DbContext(typeof(CrmContext))]
    [Migration("20170730194905_SoftDeleteMigration")]
    partial class SoftDeleteMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("angular.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasMaxLength(70);

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.HasKey("Id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("angular.Models.GroupTeachers", b =>
                {
                    b.Property<int>("GroupId");

                    b.Property<int>("TeacherId");

                    b.HasKey("GroupId", "TeacherId");

                    b.HasIndex("TeacherId");

                    b.ToTable("GroupTeachers");
                });

            modelBuilder.Entity("angular.Models.GroupUser", b =>
                {
                    b.Property<int>("GroupId");

                    b.Property<int>("UserId");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("angular.Models.Teacher", b =>
                {
                    b.Property<int>("Id");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsDeleted");

                    b.HasKey("Id");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("angular.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsAdmin");

                    b.Property<bool>("IsDeleted");

                    b.Property<bool>("IsTeacher");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("angular.Models.GroupTeachers", b =>
                {
                    b.HasOne("angular.Models.Group", "Group")
                        .WithMany("Teachers")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("angular.Models.Teacher", "Teacher")
                        .WithMany("Groups")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("angular.Models.GroupUser", b =>
                {
                    b.HasOne("angular.Models.Group", "Group")
                        .WithMany("Students")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("angular.Models.User", "User")
                        .WithMany("Groups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("angular.Models.Teacher", b =>
                {
                    b.HasOne("angular.Models.User", "User")
                        .WithOne("TeacherInfo")
                        .HasForeignKey("angular.Models.Teacher", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
