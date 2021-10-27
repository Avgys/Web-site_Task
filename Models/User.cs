using System;

namespace itechart.CarRental.Models
{	
	public class User : Account
	{
		public int Id { get; set; }
		public bool IsConfirmed { get; set; }
	}
}