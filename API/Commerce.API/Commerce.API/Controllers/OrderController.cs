using System.Text.Json.Serialization;
using System.Text.Json;
using Commerce.API.Models;
using Commerce.API.Models.DTO;
using Commerce.API.Repositories.Implementation;
using Commerce.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Commerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderRepository orderRepository;
        public OrderController(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        [HttpGet("checkCoupon")]
        [Authorize]
        public async Task<IActionResult> GetCoupon(string couponCode)
        {
            try
            {
                if (string.IsNullOrEmpty(couponCode))
                {
                    // If the coupon code is not provided, return a 400 Bad Request response
                    return BadRequest("Coupon code is required");
                }

                var coupon = await orderRepository.CheckCoupon(couponCode);

                if (coupon == null)
                {
                    // If the coupon is not found, return a 404 Not Found response
                    return NotFound("Coupon not found");
                }

                return Ok(coupon);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }



        [Authorize]
        [HttpPost("createOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO orders)
        {
            try
            {
                var order = await orderRepository.CreateOrderAsync(orders);
                if (order == null)
                {
                    return NotFound("Order could not be created");
                }

                return Ok(order);
            }
            catch (Exception ex)
            {
                // Log the exception for further investigation
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
