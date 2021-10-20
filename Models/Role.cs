using System;
using System.Collections.Generic;

namespace itechart.carRental.Models {

    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Account> Users { get; set; }
        public Role()
        {
            Users = new List<Account>();
        }
    }
}

