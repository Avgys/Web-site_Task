using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using itechart.carRental.Models;
using itechart.carRental.DbContexts;

namespace itechart.carRental.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CarsDBContext _context;

        public AdminController(CarsDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAdminAccounts()
        {
            return await _context.AdminAccounts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAdminAccount(int id)
        {
            var adminAccount = await _context.AdminAccounts.FindAsync(id);

            if (adminAccount == null)
            {
                return NotFound();
            }

            return adminAccount;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminAccount(int id, Account adminAccount)
        {
            if (id != adminAccount.Id)
            {
                return BadRequest();
            }

            _context.Entry(adminAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminAccountExists(id))
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
        public async Task<ActionResult<Account>> PostAdminAccount(Account adminAccount)
        {
            _context.AdminAccounts.Add(adminAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdminAccount), new { id = adminAccount.Id }, adminAccount);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminAccount(int id)
        {
            var adminAccount = await _context.AdminAccounts.FindAsync(id);
            if (adminAccount == null)
            {
                return NotFound();
            }

            _context.AdminAccounts.Remove(adminAccount);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminAccountExists(int id)
        {
            return _context.AdminAccounts.Any(e => e.Id == id);
        }
    }
}
