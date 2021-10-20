using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsersApi;
using itechart.carRental.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net;
using itechart.carRental.DbContexts;

namespace itechart.carRental.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly CarsDBContext _context;
        private Role _userRole;

        public UserAccountController(CarsDBContext context)
        {
            _context = context;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginUserModel model)
        {
            Account user = await _context.UserAccounts
                .FirstOrDefaultAsync(u => 
                    u.Login == model.Login && u.Password == model.Password
                );
            if (user != null)
            {
                user.Role = await _context.Roles.FindAsync(user.RoleId);
                await Authenticate(user); 
                Account result = new Account() { Id = 0, Name = user.Name, Login = user.Login, PhoneNumber = user.PhoneNumber };
                return Ok(result);
            }
            else
            {                
                return BadRequest("Wrond login or password"); 
            }
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<Account>> Register(RegisterUserModel model)
        {
            if (model.Login == "guest")
            {
                return BadRequest("Don't use `guest` login");
            }

            Account user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Login == model.Login);
            if (user == null)
            {
                _userRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "user");
                Account newMember = new Account
                {
                    Login = model.Login,
                    Name = model.Name,
                    Password = model.Password,
                    PhoneNumber = model.PhoneNumber,
                    Role = _userRole,
                    RoleId = _userRole.Id
                };

                _context.UserAccounts.Add(newMember);
                await _context.SaveChangesAsync();
                await Authenticate(newMember);

                return CreatedAtAction("GetUserAccount", "Success");
            }
            else
            {                
                return BadRequest("already used"); // found already registered user
            }
        }

        private async Task Authenticate(Account user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role?.Name)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "UserCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [Route("logout")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return NoContent();
        }

       
        [HttpGet]
        public async Task<ActionResult<Account>> GetUserAccount()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (User.IsInRole("user"))
                {
                    Account user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);

                    if (user == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        Account result = new Account() { Id = 0, Name = user.Name, Login = user.Login, PhoneNumber = user.PhoneNumber };
                        return result;
                    }
                }
                else
                {
                    return BadRequest("Wrong role");
                }
            }
            else
            {
                return Unauthorized();
            }  
        }        

        // PUT: api/Account/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUserAccount(int id, Account Account)
        //{
        //    if (id != Account.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(Account).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!UserAccountExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Account
        //[HttpPost]
        //public async Task<ActionResult<Account>> PostUserAccount(Account Account)
        //{
        //    _context.UserAccounts.Add(Account);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUserAccount", new { id = Account.Id }, Account);
        //}

        // DELETE: api/Account/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUserAccount(int id)
        //{
        //    var Account = await _context.UserAccounts.FindAsync(id);
        //    if (Account == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.UserAccounts.Remove(Account);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool UserAccountExists(int id)
        {
            return _context.UserAccounts.Any(e => e.Id == id);
        }
    }
}
