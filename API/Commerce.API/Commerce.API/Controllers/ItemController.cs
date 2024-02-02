using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Implementation;
using Commerce.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Commerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : Controller
    {
        private readonly IItemRepository itemRepository;
        public ItemController(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }


        [HttpGet("getAllItems")]
        public async Task<IActionResult> GetAllItems(int pageNumber, int pageSize)
        {
            try
            {
                var customResponse = await itemRepository.GetAllItemsAsync(pageNumber, pageSize);

                if (customResponse.Response == null || !customResponse.Response.Any())
                {
                    // If no items are found, return a 404 Not Found response
                    return NotFound("No items found");
                }

                // Return the custom response if items exist
                return Ok(customResponse);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("getRandomItems")]
        public async Task<IActionResult> GetRandomItems(int count)
        {
            try
            {
                var items = await itemRepository.GetRandomItemsAsync(count);

                if (items == null || !items.Any())
                {
                    // If no random items are found, return a 404 Not Found response
                    return NotFound("No random items found");
                }

                // Return the random items if they exist
                return Ok(items);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetItemById(string id)
        {

            try
            {
                var item = await itemRepository.GetByIdAsync(id);

                if (item == null)
                {
                    // If the item is not found, return a 404 Not Found response
                    return NotFound("Item not found");
                }

                // Return the item if it exists
                return Ok(item);
            }
            catch (UnauthorizedAccessException)
            {
                // Handle the case where the user is not authenticated
                return Unauthorized("You must be logged in");
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }

        }

        [HttpGet("getByCategory/{categoryId}")]
        [Authorize]
        public async Task<IActionResult> GetItemByCategoryId(int pageNumber, int pageSize ,string categoryId)
        {

            try
            {
                var item = await itemRepository.GetByCategoryIdAsync(pageNumber, pageSize, categoryId);

                if (item == null)
                {
                    // If the item is not found, return a 404 Not Found response
                    return NotFound("Item not found");
                }

                // Return the item if it exists
                return Ok(item);
            }
            catch (UnauthorizedAccessException)
            {
                // Handle the case where the user is not authenticated
                return Unauthorized("You must be logged in");
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }

        }

        [HttpGet("mainVisual/{id}")]
        public async Task<IActionResult> GetMainVisualByIdAsync(string id)
        {

            try
            {
                var mainVisual = await itemRepository.GetMainVisualByIdAsync(id);

                if (mainVisual == null)
                {
                    // If the mainVisual is not found, return a 404 Not Found response
                    return NotFound("Main visual not found");
                }

                // Return the mainVisual if it exists
                return Ok(mainVisual);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }

        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchItems(string searchTerm)
        {
            try
            {
                var customResponse = await itemRepository.SearchItemsAsync(searchTerm);

                if (customResponse.Response == null || !customResponse.Response.Any())
                {
                    // If no items are found, return a 404 Not Found response
                    return NotFound("No items found");
                }

                // Return the custom response if items exist
                return Ok(customResponse);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }


    }
}
