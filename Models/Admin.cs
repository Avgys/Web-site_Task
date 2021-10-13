﻿using System;

namespace UsersApi.Models
{
	using Roles;

	public class AdminAccount : IUser
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string passhash { get; set; }

		public int? RoleId { get; set; }
		public Role Role { get; set; }

		public AdminAccount()
		{
		}
	}
}