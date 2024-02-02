using Commerce.API.Data;
using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

namespace Commerce.API.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;
        private readonly PasswordHashService passwordHashService;

        public UserRepository(ApplicationDbContext dbContext,PasswordHashService passwordHashService)
        {
            this.dbContext = dbContext;
            this.passwordHashService = passwordHashService;
        }
        public async Task<User> CreateAsync(User user)
        {
            return null;
        }

        public async Task<User> GetUserByIdAsync(string userId)
        {
            var guidUserId = Guid.Parse(userId);
            var user = dbContext.Users.FirstOrDefault(x => x.Id == guidUserId);
            return user;
        }

        public async Task<User> GetUserByNameAsync(string userName)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Username == userName);
            return user;
        }

        public User LoginUser(UserLoginDTO userLogin)
        {
            string storedHashedPassword = GetHashedPasswordFromDatabase(userLogin.Username);

            if (storedHashedPassword != null)
            {
                // Verify the entered password against the stored hashed password
                bool isPasswordValid = passwordHashService.VerifyPassword(userLogin.Password, storedHashedPassword);

                if (isPasswordValid)
                {
                    var user = dbContext.Users.FirstOrDefault(x => x.Username == userLogin.Username && x.Password == storedHashedPassword);
                    return user;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

        }

        public User RegisterUser(UserRegisterDTO userLogin)
        {
            string hashedPassword = passwordHashService.HashPassword(userLogin.Password);
            User user = new User
            {
                Username = userLogin.Username,
                Password = hashedPassword,
                Email = userLogin.Email,
                FirstName = userLogin.FirstName,
                LastName = userLogin.LastName,
                Role = 0
            };
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return user;
        }
        


        private string GetHashedPasswordFromDatabase(string username)
        {
            
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            return user.Password;
        }


    }
}
