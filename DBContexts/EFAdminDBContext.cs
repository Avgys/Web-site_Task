using System;
using Microsoft.EntityFrameworkCore;
using DBRepository;

namespace AdminApi
{
    using Models;
    public class EFAdminDBContext : DbContext, IDBContext<AdminAccount>
    {
        private static bool isCreated = false;

        public EFAdminDBContext(DbContextOptions<EFAdminDBContext> options) : base(options)
        {
            //if (!isCreated)
            //{
            //    isCreated = true;

            //    Database.OpenConnection();
            //}
            Database.EnsureCreated();
        }
        public DbSet<AdminAccount> AdminAccounts { get; set; }

        public DbSet<AdminAccount> GetItems()
        {
            return AdminAccounts;
        }        
    }
}

