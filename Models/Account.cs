using System;

namespace itechart.CarRental.Models
{
	public class LightAccount
	{
		public string Name { get; set; }
		public string Login { get; set; }
		public string PhoneNumber { get; set; }
		public string RoleName { get; set; }
	}
	
	public class Account : LightAccount
	{
		public string Password { get; set; }
		public int RoleId { get; set; }
		public Role Role{ get; set; }
	}
}