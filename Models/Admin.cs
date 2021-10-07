using System;

namespace AdminApi.Models
{
	public class AdminAccount
	{

		public int Id { get; set; }
		public string Login { get; set; }
		public string passhash { get; set; }

		public AdminAccount()
		{
		}
	}
}