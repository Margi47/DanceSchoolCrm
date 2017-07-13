using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace angular.Models
{
    public class CrmContext : DbContext
    {
        public CrmContext(DbContextOptions<CrmContext> options)
            : base(options)
        { }

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

            modelBuilder.Entity<User>()
                .Property<bool>("IsDeleted");

            //modelBuilder.Entity<User>()
              //  .HasQueryFilter(post => EF.Property<bool>(post, "IsDeleted") == false);

            modelBuilder.Entity<Group>()
                .Property<bool>("IsDeleted");

            modelBuilder.Entity<Teacher>()
                .Property<bool>("IsDeleted");

            modelBuilder.Entity<GroupUser>()
                .Property<bool>("IsDeleted");

            modelBuilder.Entity<GroupTeachers>()
                .Property<bool>("IsDeleted");
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnBeforeSaving()
        {
            foreach (var entry in ChangeTracker.Entries<User>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }

            foreach (var entry in ChangeTracker.Entries<Group>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }

            foreach (var entry in ChangeTracker.Entries<Teacher>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }

            foreach (var entry in ChangeTracker.Entries<GroupUser>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }

            foreach (var entry in ChangeTracker.Entries<GroupTeachers>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["IsDeleted"] = false;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }
        }
    }
}
