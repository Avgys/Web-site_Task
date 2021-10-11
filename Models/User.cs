using System;

namespace UserApi
{
	public class UserAccount
	{

		public int Id { get; set; }
		public string Name { get; set; }
		public string Login { get; set; }
		public string passhash { get; set; }
		public string PhoneNumber { get; set; }
		public bool IsConfirmed { get; set; }

		public UserAccount()
		{
		}
	}
}