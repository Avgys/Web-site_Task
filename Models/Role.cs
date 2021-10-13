using System;
using System.Collections.Generic;
using UsersApi.Models;
using UsersApi;

namespace Roles {

    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<UserAccount> Users { get; set; }
        public Role()
        {
            Users = new List<UserAccount>();
        }
    }
}

