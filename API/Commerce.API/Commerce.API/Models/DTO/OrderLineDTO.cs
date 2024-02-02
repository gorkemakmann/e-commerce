namespace Commerce.API.Models.DTO
{
    public class OrderLineDTO
    {
        public string Id { get; set; } // Change this to string
        public string ItemName { get; set; }
        public string ItemId { get; set; } // Change this to string
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
