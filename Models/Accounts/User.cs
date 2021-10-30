using System;

namespace itechart.CarRental.Models.Accounts
{	
	public class User : Account
	{
		public int Id { get; set; }
		public bool IsConfirmed { get; set; }
	}
}