using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Implementation;
using Commerce.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Commerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {
        private readonly IReviewRepository reviewRepository;
        public ReviewController(IReviewRepository reviewRepository)
        {
            this.reviewRepository = reviewRepository;
        }


        [HttpGet("getRandomReviews")]
        public async Task<IActionResult> GetRandomReviews()
        {
            try
            {
                var reviews = await reviewRepository.GetRandomReviewsAsync();

                if (reviews == null || !reviews.Any())
                {
                    // If no reviews are found, return a 404 Not Found response
                    return NotFound("No reviews found");
                }

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
