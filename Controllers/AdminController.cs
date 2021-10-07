using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminApi.Models;

namespace Cars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EFAdminDBContext _context;

        public AdminController(EFAdminDBContext context)
        {
            _context = context;
        }

        // GET: api/AdminAccounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminAccount>>> GetAdminAccounts()
        {
            return await _context.AdminAccounts.ToListAsync();
        }

        // GET: api/AdminAccounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminAccount>> GetAdminAccount(int id)
        {
            var adminAccount = await _context.AdminAccounts.FindAsync(id);

            if (adminAccount == null)
            {
                return NotFound();
            }

            return adminAccount;
        }

        // PUT: api/AdminAccounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminAccount(int id, AdminAccount adminAccount)
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

        // POST: api/AdminAccounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdminAccount>> PostAdminAccount(AdminAccount adminAccount)
        {
            _context.AdminAccounts.Add(adminAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdminAccount), new { id = adminAccount.Id }, adminAccount);
        }

        // DELETE: api/AdminAccounts/5
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
