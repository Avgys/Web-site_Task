using itechart.CarRental.DbContexts;
using itechart.CarRental.Models.Accounts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
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
        private readonly List<Role> Roles;

        public AccountController(CarsDBContext context)
        {
            _context = context;
            Roles = _context.Roles.ToList();
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
                    await AuthenticateAsync(user);
                    UserInfo result = new UserInfo()
                    {
                        Name = user.Name,
                        Login = user.Login,
                        PhoneNumber = user.PhoneNumber,
                        IsConfirmed = user.IsConfirmed,
                        RoleName = user.Role.Name

                    };
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
                    await AuthenticateAsync(admin); 
                    AdminInfo result = new AdminInfo()
                    {
                        Name = admin.Name,
                        Login = admin.Login,
                        PhoneNumber = admin.PhoneNumber,
                        RentalId = admin.RentalId,
                        RoleName = admin.Role.Name,
                    };
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
            Role role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == model.Role);
            if (role == null)
            {
                return BadRequest($"No such role exists");
            }
            if (user == null)
            {
                User newMember = new User()
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
                await AuthenticateAsync(newMember);

                return CreatedAtAction("GetUserAccount", "Success");
            }
            else
            {
                return Conflict($"Login {model.Login} already used");
            }
        }

        private async Task AuthenticateAsync(Account user)
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

        private UserInfo ConvertAccountToUserInfo(Account u)
        {
            string roleName = Roles.Find(r => r.Id == u.RoleId).Name;
            return new UserInfo()
            {
                Login = u.Login,
                Name = u.Name,
                PhoneNumber = u.PhoneNumber,
                RoleName = roleName
            };
        }

        [HttpGet]
        [Route("users")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<UserInfo>>> GetUsersAccounts(
            [FromQuery] int offset,
            [FromQuery] int count
        )
        {
            List<User> userList = await _context.Users.OrderBy(u => u.Login).Skip(offset).Take(count).ToListAsync();

            if (userList == null)
            {
                return NotFound();
            }

            List<UserInfo> users = new List<UserInfo>(count);

            for (int i = 0; i < userList.Count; i++)
            {
                users.Add(new UserInfo()
                {
                    Login = userList[i].Login,
                    Name = userList[i].Name,
                    PhoneNumber = userList[i].PhoneNumber,
                    RoleName = Roles.Find(r => r.Id == userList[i].Role.Id).Name
                });
            }

            return users.ToList();
        }

        [HttpGet]
        [Route("admin")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<AdminInfo>>> GetAdminAccount()
        {
            Admin admin = await _context.Admins.FirstOrDefaultAsync(u => u.Login == HttpContext.User.Identity.Name);

            if (admin == null)
            {
                return NotFound();
            }
            else
            {
                Role role = Roles.Find(r => r.Id == admin.RoleId);
                return new AdminInfo[] 
                {
                    new AdminInfo() 
                    {
                        Name = admin.Name,
                        Login = admin.Login,
                        PhoneNumber = admin.PhoneNumber,
                        RentalId = admin.RentalId,
                        RoleName = role.Name
                    }
                };
            }
        }

        [HttpGet("{login}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserInfo>>> GetUserAccount(string login)
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
                    Role role = Roles.Find(r => r.Id == user.RoleId);
                    return new UserInfo[] 
                    {
                        new UserInfo() 
                        {
                            Name = user.Name,
                            Login = user.Login,
                            PhoneNumber = user.PhoneNumber,
                            RoleName = role.Name
                        }
                    };
                }
            }
            else
            {
                return Forbid();
            }
        }

        [HttpPut("{login}")]
        public async Task<IActionResult> PutUserAccount(string login, Account Account)
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
                _context.Entry(User).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!(await UserAccountExistsAsync(user.Login)))
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
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return NoContent();
        }

        [HttpDelete("{login}")]
        [Authorize("admin")]
        public async Task<IActionResult> DeleteUserAccount(string login)
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
                if (!(await UserAccountExistsAsync(user.Login)))
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

        private async Task<bool> UserAccountExistsAsync(string login)
        {
            return await _context.Users.AnyAsync(e => e.Login == login);
        }
    }
}