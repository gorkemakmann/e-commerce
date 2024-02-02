using Commerce.API.Models;

namespace Commerce.API.Repositories.Interface
{
    public interface IReviewRepository
    {
        Task<Review> CreateAsync(Review review);
        Task<List<Review>> GetRandomReviewsAsync();

    }
}
