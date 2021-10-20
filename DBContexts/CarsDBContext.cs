using System;
using Microsoft.EntityFrameworkCore;
using itechart.carRental.Models;

namespace itechart.carRental.DbContexts
{
    public class CarsDBContext : DbContext
    {
        public DbSet<Account> UserAccounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Account> AdminAccounts { get; set; }

        public CarsDBContext(DbContextOptions<CarsDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}

