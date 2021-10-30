using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using itechart.CarRental.DbContexts;
using itechart.CarRental.Models.CarRental;

namespace Cars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarRentalPointsController : ControllerBase
    {
        private readonly CarsDBContext _context;

        public CarRentalPointsController(CarsDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FrontCarRentalPoint>>> GetCarRentalPoint(
            [FromQuery] int offset,
            [FromQuery] int count
        )
        {
            List<CarRentalPoint> carRentalPoints = await _context.CarRentalPoint.Skip(offset).Take(count).ToListAsync();

            if (carRentalPoints == null)
            {
                return NotFound();
            }

            List<FrontCarRentalPoint> frontCarRentalPoints = new List<FrontCarRentalPoint>(count);

            for (int i = 0; i < count; i++)
            {
                frontCarRentalPoints.Add(new FrontCarRentalPoint()
                {
                    Country = carRentalPoints[i].Country,
                    City = carRentalPoints[i].City,
                    Address = carRentalPoints[i].Address
                });
            }

            return frontCarRentalPoints;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FrontCarRentalPoint>> GetCarRentalPoint(int id)
        {
            CarRentalPoint carRentalPoint = await _context.CarRentalPoint.FindAsync(id);

            if (carRentalPoint == null)
            {
                return NotFound();
            }          

            return new FrontCarRentalPoint()
            {
                Country = carRentalPoint.Country,
                City = carRentalPoint.City,
                Address = carRentalPoint.Address
            };
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles ="admin")]
        public async Task<IActionResult> PutCarRentalPoint(int id, CarRentalPoint carRentalPoint)
        {
            if (id != carRentalPoint.Id)
            {
                return BadRequest();
            }

            _context.Entry(carRentalPoint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarRentalPointExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<CarRentalPoint>> PostCarRentalPoint(CarRentalPoint carRentalPoint)
        {
            _context.CarRentalPoint.Add(carRentalPoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarRentalPoint", new { id = carRentalPoint.Id }, carRentalPoint);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteCarRentalPoint(int id)
        {
            CarRentalPoint carRentalPoint = await _context.CarRentalPoint.FindAsync(id);
            if (carRentalPoint == null)
            {
                return NotFound();
            }

            _context.CarRentalPoint.Remove(carRentalPoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarRentalPointExists(int id)
        {
            return _context.CarRentalPoint.Any(e => e.Id == id);
        }
    }
}
