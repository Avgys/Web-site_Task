using itechart.CarRental.DbContexts;
using itechart.CarRental.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace itechart.CarRental.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly CarsDBContext _context;

        public AccountController(CarsDBContext context)
        {
            _context = context;

        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(LoginAccountModel model)
        {
            if (model.Role == "user")
            {
                User user = await _context.Users
                    .FirstOrDefaultAsync(u =>
                        u.Login == model.Login && u.Password == model.Password
                    );
                if (user != null)
                {
                    user.Role = await _context.Roles.FindAsync(user.RoleId);
                    await Authenticate(user);
                    Account result = new Account() { Name = user.Name, Login = user.Login, PhoneNumber = user.PhoneNumber };
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Wrong login or password");
                }
            }
            else if (model.Role == "admin")
            {
                Admin admin = await _context.Admins
                 .FirstOrDefaultAsync(u =>
                     u.Login == model.Login && u.Password == model.Password
                 );

                if (admin != null)
                {
                    admin.Role = await _context.Roles.FindAsync(admin.RoleId);
                    await Authenticate(admin);
                    Account result = new Account() { Name = admin.Name, Login = admin.Login, PhoneNumber = admin.PhoneNumber };
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Wrong login or password");
                }
            }
            else
            {
                return BadRequest("Wrong role");
            }
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult<Account>> Register(RegisterAccountModel model)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login);
            Role role = _context.Roles.FirstOrDefault(x => x.Name == model.Role);
            if (role == null)
            {
                return BadRequest($"No such role exists");
            }
            if (user == null)
            {
                User newMember = new User
                {
                    Login = model.Login,
                    Name = model.Name,
                    Password = model.Password,
                    PhoneNumber = model.PhoneNumber,
                    Role = role,
                    RoleId = role.Id
                };

                _context.Users.Add(newMember);
                await _context.SaveChangesAsync();
                await Authenticate(newMember);

                return CreatedAtAction("GetUserAccount", "Success");
            }
            else
            {
                return BadRequest($"Login {model.Login} already used");
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

        //private SafetyAccount TransformUserToSafetyAccount(User )

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetUserAccount([FromQuery] int offset, [FromQuery] int count, [FromQuery] bool isCurrent = true)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (User.IsInRole("admin"))
                {
                    if (isCurrent)
                    {
                        Account admin = await _context.Admins.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);

                        if (admin == null)
                        {
                            return NotFound();
                        }
                        else
                        {
                            return new Account[] { new Account {
                                Name = admin.Name, Login = admin.Login, PhoneNumber = admin.PhoneNumber, RoleName = "admin"
                            }};
                        }
                    }
                    else
                    {
                        Account[] users = await _context.Users.ToArrayAsync();
                        if (users == null)
                        {
                            return NotFound();
                        }
                        return users;
                    }
                }
                else if (User.IsInRole("user"))
                {
                    Account user = await _context.Users.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);

                    if (user == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        return new Account[] {
                            new Account() {
                                Name = user.Name, Login = user.Login, PhoneNumber = user.PhoneNumber, RoleName = "user"
                            }};
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

        [HttpGet("{login}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetUserAccount(string login)
        {
            if (User.Identity.IsAuthenticated)
            {
                if ((User.IsInRole("user") && HttpContext.User.Identity.Name == login) || User.IsInRole("admin"))
                {
                    Account user = await _context.Users.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);


                    if (user == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        Role role = await _context.Roles.FindAsync(user.RoleId);
                        return new Account[] {
                            new Account() {
                                Name = user.Name, Login = user.Login, PhoneNumber = user.PhoneNumber, RoleName = role.Name
                            }};
                    }
                }
                else
                {
                    return BadRequest("Not accessed");
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPut("{login}")]
        public async Task<IActionResult> PutUserAccount(string login, Account Account)
        {
            if (User.Identity.IsAuthenticated)
            {
                if ((User.IsInRole("user") && User.Identity.Name == login) || User.IsInRole("admin"))
                {
                    User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);
                    if (user == null)
                    {
                        return NotFound();
                    }
                    user.Name = Account.Name ?? user.PhoneNumber;
                    user.PhoneNumber = Account.PhoneNumber ?? user.PhoneNumber;
                    user.Password = Account.Password ?? user.Password;
                    //user.Login = Account.Login ?? user.Login;
                    _context.Entry(User).State = EntityState.Modified;

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!UserAccountExists(user.Login))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
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

            return NoContent();
        }

        [HttpDelete("{login}")]
        public async Task<IActionResult> DeleteUserAccount(string login)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (User.IsInRole("user") || User.IsInRole("admin"))
                {
                    User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == login);

                    if (user == null)
                    {
                        return NotFound();
                    }

                    _context.Users.Remove(user);

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!UserAccountExists(user.Login))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
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

            return NoContent();
        }

        private bool UserAccountExists(string login)
        {
            return _context.Users.Any(e => e.Login == login);
        }
    }
}
