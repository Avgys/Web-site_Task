using System;

namespace itechart.carRental.Models
{	
	public class Account
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public string PhoneNumber { get; set; }
		public bool IsConfirmed { get; set; }
        public int RoleId { get; set; }
		public Role Role { get; set; }

		public Account()
		{
		}
	}
}