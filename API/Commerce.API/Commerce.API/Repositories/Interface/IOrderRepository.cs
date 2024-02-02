using Commerce.API.Models;
using Commerce.API.Models.DTO;
using static Commerce.API.Models.DTO.Response;

namespace Commerce.API.Repositories.Interface
{
    public interface IOrderRepository
    {
        Task<Coupon> CheckCoupon(string couponCode);

        Task<List<OrderLine>> CreateOrderAsync(CreateOrderDTO order);
    }
}
