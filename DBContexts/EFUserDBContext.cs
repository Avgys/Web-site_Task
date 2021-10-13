using System;
using Microsoft.EntityFrameworkCore;

using Roles;

namespace UsersApi
{
    using DBRepository;
    using Models;

    public class EFUserDBContext : DbContext, IDBContext<UserAccount>
    {

        public EFUserDBContext(DbContextOptions<EFUserDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Role> Roles { get; set; }


        public DbSet<UserAccount> GetItems()
        {
            return UserAccounts;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            //UserAccount adminUser = new UserAccount { Id = 1, Login = "a", passhash = "qwerty" };
            
            //////modelBuilder.Entity<Role>().HasData(new Role[] { adminRole, userRole });
            //modelBuilder.Entity<UserAccount>().HasData(new UserAccount[] { adminUser });
            //base.OnModelCreating(modelBuilder);
        }
    }
}

