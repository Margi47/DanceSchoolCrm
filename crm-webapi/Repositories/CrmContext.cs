using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crm_webapi.Models
{
    public class CrmContext : DbContext
    {
        public CrmContext(DbContextOptions<CrmContext> options)
            : base(options)
        {}

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupUser> GroupUser { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<GroupTeachers> GroupTeachers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupUser>()
                .HasKey(gu => new { gu.GroupId, gu.UserId });

            modelBuilder.Entity<GroupUser>()
                .HasOne(gu => gu.Group)
                .WithMany(g => g.Students)
                .HasForeignKey(gu => gu.GroupId);

            modelBuilder.Entity<GroupUser>()
                .HasOne(gu => gu.User)
                .WithMany(u => u.Groups)
                .HasForeignKey(gu => gu.UserId);

            modelBuilder.Entity<GroupTeachers>()
                .HasKey(gt => new { gt.GroupId, gt.TeacherId });

            modelBuilder.Entity<GroupTeachers>()
                .HasOne(gu => gu.Group)
                .WithMany(g => g.Teachers)
                .HasForeignKey(gu => gu.GroupId);

            modelBuilder.Entity<GroupTeachers>()
                .HasOne(gu => gu.Teacher)
                .WithMany(u => u.Groups)
                .HasForeignKey(gu => gu.TeacherId);

            modelBuilder.Entity<Teacher>()
                .HasOne(t => t.User)
                .WithOne(i => i.TeacherInfo)
                .HasForeignKey<Teacher>(t => t.Id);
        }
    }
}
