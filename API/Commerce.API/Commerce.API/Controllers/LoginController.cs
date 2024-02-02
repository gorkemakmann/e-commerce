using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Commerce.API.Models.DTO;
using Commerce.API.Models;
using Commerce.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Commerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository userRepository;
        private readonly PasswordHashService passwordHashService;

        public LoginController(IConfiguration config, IUserRepository userRepository, PasswordHashService passwordHashService)
        {
            _config = config;
            this.userRepository = userRepository;
            this.passwordHashService = passwordHashService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] UserLoginDTO userLogin)
        {
            try
            {
                var user = Authenticate(userLogin);

                if (user != null)
                {
                    var tempToken = GenerateToken(user);
                    var token = "Bearer " + tempToken;
                    var response = new LoginResponseDTO
                    {
                        User = user,
                        Token = token
                    };
                    return Ok(response);
                }

                // If the authentication fails, return a 401 Unauthorized response
                return Unauthorized("Invalid username or password");
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult Register([FromBody] UserRegisterDTO userRegister)
        {
            try
            {
                var user = userRepository.RegisterUser(userRegister);

                if (user == null)
                {
                    // If the registration fails, return a 400 Bad Request response
                    return BadRequest("User registration failed");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }

        // To generate token
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Username),
                new Claim(ClaimTypes.Role,user.Role.ToString())
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        //To authenticate user
        private User Authenticate(UserLoginDTO userLogin)
        {
            
            var currentUser = userRepository.LoginUser(userLogin);
            if (currentUser != null)
             {
                return currentUser;
             }
          
            return null;

        }

    }
}
