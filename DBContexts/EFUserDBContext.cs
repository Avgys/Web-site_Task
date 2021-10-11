using System;
using Microsoft.EntityFrameworkCore;
using DBRepository;

namespace UserApi
{
    public class EFUserDBContext : DbContext, IDBContext<UserAccount>
    {
        private static bool isCreated = false;

        public EFUserDBContext(DbContextOptions<EFUserDBContext> options) : base(options)
        {
            //if (!isCreated)
            //{
            //    isCreated = true;

            //    Database.OpenConnection();
            //}
            Database.EnsureCreated();
        }
        public DbSet<UserAccount> UserAccounts { get; set; }

        public DbSet<UserAccount> GetItems()
        {
            return UserAccounts;
        }
    }
}

