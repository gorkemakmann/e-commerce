namespace Commerce.API.Models.DTO
{
    public class CreateOrderDTO
    {
        public int TotalItems { get; set; }
        public OrderLineDTO[] OrderLines { get; set; }
        public float TotalPrice { get; set; }
        public Guid UserId { get; set; }
        public bool IsDiscountApplied { get; set; }
    }
}
