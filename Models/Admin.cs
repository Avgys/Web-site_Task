using System;

namespace itechart.CarRental.Models
{
	public class Admin : Account
	{
		public int Id { get; set; }
		public int RentalId { get; set; }
	}
}