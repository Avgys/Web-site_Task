using System;

namespace itechart.CarRental.Models
{
	public class Account
	{
		public string Name { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public string PhoneNumber { get; set; }
		public int RoleId { get; set; }
		public Role Role { get; set; }
	}
}