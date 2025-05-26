using IdentityApi.Models;
using Microsoft.EntityFrameworkCore;

namespace IdentityApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserIdentity> UserIdentities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1. Default constraint to auto-set LastUpdated to current UTC on insert
            modelBuilder.Entity<UserIdentity>()
                .Property(u => u.LastUpdated)
                .HasDefaultValueSql("GETUTCDATE()");

            // 2. Seed data *without* specifying LastUpdated
            modelBuilder.Entity<UserIdentity>().HasData(
                new UserIdentity
                {
                    Id = 1,
                    UserId = "U001",
                    FullName = "John Test",
                    Email = "john.doe@example.com",
                    SourceSystem = "HR",
                    IsActive = true
                },
                new UserIdentity
                {
                    Id = 2,
                    UserId = "U002",
                    FullName = "Queen Test",
                    Email = "queen.test@example.com",
                    SourceSystem = "Finance",
                    IsActive = true
                },
                new UserIdentity
                {
                    Id = 3,
                    UserId = "U003",
                    FullName = "Prince Test",
                    Email = "prince.test@example.com",
                    SourceSystem = "Information Technology",
                    IsActive = true
                }
            );
        }
    }
}
