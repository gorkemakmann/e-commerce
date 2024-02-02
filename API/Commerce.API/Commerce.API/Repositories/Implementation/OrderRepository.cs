using Azure;
using Commerce.API.Data;
using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using static Commerce.API.Models.DTO.Response;

namespace Commerce.API.Repositories.Implementation
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext dbContext;

        public OrderRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Coupon> CheckCoupon(string couponCode)
        {

            var coupon = await dbContext.Coupons.FirstOrDefaultAsync(x => x.CouponCode == couponCode);
            if (coupon != null)
            {
                return coupon;
            }
            return null;
        }


        public async Task<List<OrderLine>> CreateOrderAsync(CreateOrderDTO order)
        {
            var orderHead = new OrderHeader
            {
                Id = Guid.NewGuid(),
                TotalItems = order.TotalItems,
                TotalPrice = order.TotalPrice,
                IsDiscountApplied = order.IsDiscountApplied,
                UserId = order.UserId,
            };

            await dbContext.OrderHeader.AddAsync(orderHead);
            await dbContext.SaveChangesAsync();

            var orderLines = new List<OrderLine>();
            foreach (var item in order.OrderLines)
            {
                var response = new OrderLine
                {
                    ItemName = item.ItemName,
                    ItemId = new Guid(item.ItemId), // Convert to Guid
                    Price = item.Price,
                    Quantity = item.Quantity,
                    OrderHeaderId = orderHead.Id.ToString(),
                };

                orderLines.Add(response);
            }

            // Add all order lines at once and save changes
            await dbContext.OrderLines.AddRangeAsync(orderLines);
            await dbContext.SaveChangesAsync();

            return orderLines;
        }
    }
}
