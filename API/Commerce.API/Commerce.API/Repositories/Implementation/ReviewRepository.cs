using Commerce.API.Data;
using Commerce.API.Models;
using Commerce.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

namespace Commerce.API.Repositories.Implementation
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ReviewRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Review> CreateAsync(Review review)
        {
            return null;
        }

        public async Task<List<Review>> GetRandomReviewsAsync()
        {
            var randomReviews = await dbContext.Reviews
                .OrderBy(r => r.Id)
                .Take(3)
                .ToListAsync();

            return randomReviews;
        }
    }
}
