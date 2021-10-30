using System;
using System.Collections.Generic;

namespace itechart.CarRental.Models.Accounts
{
    public class Car
    {
        public int Id { get; set; }
        public string Seats { get; set; }
        public string FuelConsumption { get; set; }
        public string TransmissionType { get; set; }
        public string Model { get; set; }
        public string Brand { get; set; }
        public byte[] Image { get; set; }        
    }
}