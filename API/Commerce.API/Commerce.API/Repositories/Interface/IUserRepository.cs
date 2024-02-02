using Commerce.API.Models;
using Commerce.API.Models.DTO;

namespace Commerce.API.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(User user);
        Task<User> GetUserByIdAsync(string userId);
        Task<User> GetUserByNameAsync(string userName);
        User LoginUser(UserLoginDTO user);
        User RegisterUser(UserRegisterDTO user);
    }
}
