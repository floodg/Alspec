using Alspec.Models;
using Microsoft.EntityFrameworkCore;

namespace Alspec.Repository
{
    public class JobManagementContext : DbContext
    {
        public DbSet<Job> Jobs { get; set; }
        public DbSet<SubItem> SubItems { get; set; }

        public JobManagementContext(DbContextOptions<JobManagementContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for Jobs and SubItems
            modelBuilder.Entity<Job>().HasData(
                new Job
                {
                    Id = 1,  // Primary key for Job
                    Title = "Job 1",
                    Description = "Alspec"
                });

            modelBuilder.Entity<SubItem>().HasData(
                new SubItem
                {
                    ItemId = 1,  // Primary key for SubItem
                    Title = "Sub-item 1",
                    Description = "Sub-item description",
                    Status = "Pending",
                    JobId = 1  // Foreign key linking to Job with Id = 1
                },
                new SubItem
                {
                    ItemId = 2,
                    Title = "Sub-item 2",
                    Description = "Another sub-item",
                    Status = "In Progress",
                    JobId = 1  // Foreign key linking to Job with Id = 1
                });
        }
    }

}
