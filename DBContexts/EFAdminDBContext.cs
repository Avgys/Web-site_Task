using System;
using Microsoft.EntityFrameworkCore;


namespace UsersApi
{
    using DBRepository;

    using Models;
    public class EFAdminDBContext : DbContext, IDBContext<AdminAccount>
    {

        public EFAdminDBContext(DbContextOptions<EFAdminDBContext> options) : base(options)
        {
            
            Database.EnsureCreated();
        }
        public DbSet<AdminAccount> AdminAccounts { get; set; }

        public DbSet<AdminAccount> GetItems()
        {
            return AdminAccounts;
        }        
    }
}

