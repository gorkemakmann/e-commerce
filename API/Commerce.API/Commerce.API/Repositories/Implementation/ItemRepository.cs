using Commerce.API.Data;
using Commerce.API.Models;
using Commerce.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using PagedList;
using PagedList.EntityFramework;
using static Commerce.API.Models.DTO.Response;

namespace Commerce.API.Repositories.Implementation
{
    public class ItemRepository : IItemRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ItemRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<CustomResponse<Item>> GetAllItemsAsync(int pageNumber, int pageSize)
        {
            int totalItems = await dbContext.Items.CountAsync();

            // Calculate the total number of pages
            int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

            var items = await dbContext.Items.OrderBy(x => x.SortOrder)
                                             .Skip((pageNumber - 1) * pageSize)
                                             .Take(pageSize)
                                             .ToListAsync();

            var response = new CustomResponse<Item>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages,
                TotalCount = totalItems,
                Response = items
            };

            return response;
        }

        public async Task<CustomResponse<Item>> GetByCategoryIdAsync(int pageNumber, int pageSize, string categoryId)
        {
            int totalItems = await dbContext.Items.Where(x => x.CategoryId == categoryId).CountAsync();

            // Calculate the total number of pages
            int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);

            var items = await dbContext.Items.Where(x => x.CategoryId == categoryId).OrderBy(x => x.SortOrder)
                                             .Skip((pageNumber - 1) * pageSize)
                                             .Take(pageSize)
                                             .ToListAsync();

            var response = new CustomResponse<Item>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages,
                TotalCount = totalItems,
                Response = items
            };

            return response;
        }
        public async Task<List<Item>> GetRandomItemsAsync(int count)
        {
            var items = await dbContext.Items.OrderBy(x => x.SortOrder).Take(count).ToListAsync();
            return items;
        }

        public async Task<Item> GetByIdAsync(string id)
        {
            var parsedGuid = Guid.Parse(id);
            var items = await dbContext.Items.FirstOrDefaultAsync(x =>  x.Id == parsedGuid);
            return items;
        }

        public async Task<ItemVisual> GetMainVisualByIdAsync(string id)
        {
            var parsedGuid = Guid.Parse(id);
            var mainVisual = await dbContext.ItemVisuals.FirstOrDefaultAsync(x => x.ItemId == parsedGuid && x.IsMain == true);
            return mainVisual;
        }

        public async Task<CustomResponse<Item>> SearchItemsAsync(string searchTerm)
        {
            var totalItems = await dbContext.Items
               .Where(e => e.Name.Contains(searchTerm))
               .CountAsync();

            var items = await dbContext.Items
               .Where(e => e.Name.Contains(searchTerm))
               .OrderBy(x => x.SortOrder)
               .ToListAsync();


            var response = new CustomResponse<Item>
            {
                PageNumber = 0,
                PageSize = 0,
                TotalPages = 1,
                TotalCount = totalItems,
                Response = items
            };

            return response;
        }

    }
}
