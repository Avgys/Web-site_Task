using Microsoft.EntityFrameworkCore;
using itechart.CarRental.Models;

namespace itechart.CarRental.DbContexts
{
    public class CarsDBContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<User> Users { get; set; }

        public CarsDBContext(DbContextOptions<CarsDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}

