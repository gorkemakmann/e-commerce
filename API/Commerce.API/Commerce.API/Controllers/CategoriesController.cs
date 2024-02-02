using Commerce.API.Data;
using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Implementation;
using Commerce.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Commerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly ICategoryRepository categoryRepository;
        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        //
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDTO request)
        {
            // Map DTO to Domain Model
            var category = new Category
            {
                Name = request.Name,
                //UrlHandle = request.UrlHandle
            };

            await categoryRepository.CreateAsync(category);


            // Domain model to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                //UrlHandle = category.UrlHandle
            };
            return Ok(response);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            try
            {
                var category = await categoryRepository.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    // If the category is not found, return a 404 Not Found response
                    return NotFound("Category not found");
                }

                // Return the category if it exists
                return Ok(category);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await categoryRepository.GetAllCategoriesAsync();

                if (categories == null || !categories.Any())
                {
                    // If no categories are found, return a 404 Not Found response
                    return NotFound("No categories found");
                }

                // Return the categories if they exist
                return Ok(categories);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
