﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsersApi;
using UsersApi.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using System.Net;
using Roles;


namespace Cars.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly EFUserDBContext _context;
        private Role _userRole;

        public UserAccountController(EFUserDBContext context)
        {
            _context = context;
        }

        [Route("login")]
        [HttpPost]
        //[ActionName("Login")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginUserModel model)
        {
            UserAccount user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Login == model.Login && u.passhash == model.Password);
            if (user != null)
            {
                user.Role = await _context.Roles.FindAsync(user.RoleId);
                await Authenticate(user); // аутентификация
                HttpResponseMessage
                return Ok("logged in");
            }
            else
            {
                
                return BadRequest("Wrond login or password"); // not found
            }
        }

        public class NotFoundWithMessageResult : IHttpActionResult
        {
            private string message;

            public NotFoundWithMessageResult(string message)
            {
                this.message = message;
            }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound);
                response.Content = new StringContent(message);
                return Task.FromResult(response);
            }
        }

        //public async Task<ActionResult<UserAccount>> PostUserAccount(UserAccount userAccount)
        //{
        //    _context.UserAccounts.Add(userAccount);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUserAccount", new { id = userAccount.Id }, userAccount);
        //}

        [Route("register")]
        [HttpPost]
        //[ActionName("Register")]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<UserAccount>> Register(RegisterUserModel model)
        {
            if (model.Login == "guest")
            {
                return BadRequest("Don't use `guest` login");
            }

            UserAccount user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Login == model.Login);
            //UserAccount user = null;
            if (user == null)
            {
                // добавляем пользователя в бд

                _userRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "user");
                var newMember = new UserAccount
                {
                    Login = model.Login,
                    Name = model.Name,
                    passhash = model.Password,
                    PhoneNumber = model.PhoneNumber,
                    Role = _userRole,
                    RoleId = _userRole.Id
                };

                _context.UserAccounts.Add(newMember);

                await _context.SaveChangesAsync();

                await Authenticate(newMember); // аутентификация

                return CreatedAtAction("GetUserAccount", "Success");
            }
            else
            {
                //var responseMessage = new HttpResponseMessage<List<string>>(errors, HttpStatusCode.BadRequest);
                //throw new HttpResponseException(responseMessage);
                return BadRequest("already used"); // found already registered user
            }
        }

        [NonAction]
        private async Task Authenticate(UserAccount user)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role?.Name)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "UserCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [Route("logout")]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return NoContent();
        }

        ////GET: api/UserAccount
        //[HttpGet({id})]
        //public async Task<ActionResult<IEnumerable<UserAccount>>> GetUserAccounts(int id)
        //{
        //    return await _context.UserAccounts.ToListAsync();
        //}

        // GET: api/UserAccount
        [HttpGet]
        //[Authorize(Roles = "user")]
        public async Task<ActionResult<UserAccount>> GetUserAccount()
        {
            if (User.Identity.IsAuthenticated)
            {
                if (User.IsInRole("user"))
                {
                    var userAccount = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);

                    if (userAccount == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        return userAccount;
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

        // PUT: api/UserAccount/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUserAccount(int id, UserAccount userAccount)
        //{
        //    if (id != userAccount.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(userAccount).State = EntityState.Modified;

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

        // POST: api/UserAccount
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<UserAccount>> PostUserAccount(UserAccount userAccount)
        //{
        //    _context.UserAccounts.Add(userAccount);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUserAccount", new { id = userAccount.Id }, userAccount);
        //}

        // DELETE: api/UserAccount/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUserAccount(int id)
        //{
        //    var userAccount = await _context.UserAccounts.FindAsync(id);
        //    if (userAccount == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.UserAccounts.Remove(userAccount);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        [NonAction]
        private bool UserAccountExists(int id)
        {
            return _context.UserAccounts.Any(e => e.Id == id);
        }
    }
}
