using System.ComponentModel.DataAnnotations;

namespace itechart.CarRental.Models.CarRental
{
	public class CarRentalPoint
	{
		public int Id { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public string Address { get; set; }		
	}
}