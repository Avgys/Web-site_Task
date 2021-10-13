using System;

namespace UsersApi.Models
{
	using Roles;
	
	public class UserAccount : IUser
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Login { get; set; }
		public string passhash { get; set; }
		public string PhoneNumber { get; set; }
		public bool IsConfirmed { get; set; }

        public int? RoleId { get; set; }
        public Role Role { get; set; }

        public UserAccount()
		{
		}
	}
}