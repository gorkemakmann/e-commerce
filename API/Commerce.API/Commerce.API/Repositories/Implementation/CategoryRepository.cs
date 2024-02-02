using Commerce.API.Data;
using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

namespace Commerce.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            return null;
        }

        public async Task<Category> GetCategoryByIdAsync(string categoryId)
        {
            var guidCategoryId = Guid.Parse(categoryId);

            var category = dbContext.Categories.FirstOrDefault(x => x.Id == guidCategoryId);
            return category;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {

            var categoryList = new List<CategoryDto>();
            var categories = await dbContext.Categories.ToListAsync();
            
            categories.ForEach(category =>
            {
                var categoryId = category.Id.ToString();
                int itemCount = dbContext.Items.Count(item => item.CategoryId == categoryId);
                var response = new CategoryDto
                {
                    Id = category.Id,
                    
                    Name = category.Name,
                    Description = category.Description,
                    ParentCategoryId = category.ParentCategoryId,
                    CategoryImage = category.CategoryImage,
                    CategoryUrl= category.CategoryUrl,
                    SortOrder = category.SortOrder,
                    TotalItemCount = itemCount
                    
                };
                categoryList.Add(response);
            });
            return categoryList;
        }
    }
}
