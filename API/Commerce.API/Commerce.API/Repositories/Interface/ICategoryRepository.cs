using Commerce.API.Models;
using Commerce.API.Models.DTO;

namespace Commerce.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<Category> GetCategoryByIdAsync(string categoryId);

        Task<List<CategoryDto>> GetAllCategoriesAsync();
    }
}
