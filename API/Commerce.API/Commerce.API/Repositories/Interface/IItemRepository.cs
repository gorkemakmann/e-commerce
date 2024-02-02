using Commerce.API.Models;
using PagedList;
using static Commerce.API.Models.DTO.Response;

namespace Commerce.API.Repositories.Interface
{
    public interface IItemRepository
    {
        Task<CustomResponse<Item>> GetAllItemsAsync(int pageNumber, int pageSize);
        Task<CustomResponse<Item>> GetByCategoryIdAsync(int pageNumber, int pageSize, string categoryId);
        Task<CustomResponse<Item>> SearchItemsAsync(string searchTerm);
        Task<List<Item>> GetRandomItemsAsync(int count);

        Task<Item> GetByIdAsync(string id);
        Task<ItemVisual> GetMainVisualByIdAsync(string id);

        
    }
}
