using Microsoft.EntityFrameworkCore;

namespace Roles
{
    
    public class RoleDBContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }

        public RoleDBContext(DbContextOptions<RoleDBContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //string adminEmail = "admin@mail.ru";
            //string adminPassword = "123456";

            //// добавляем роли
            Role adminRole = new Role { Id = 1, Name = "admin" };
            Role userRole = new Role { Id = 2, Name = "user" };
            //User adminUser = new User { Id = 1, Email = adminEmail, Password = adminPassword, RoleId = adminRole.Id };

            modelBuilder.Entity<Role>().HasData(new Role[] { adminRole, userRole });
            //modelBuilder.Entity<User>().HasData(new User[] { adminUser });
            base.OnModelCreating(modelBuilder);
        }
    }
}