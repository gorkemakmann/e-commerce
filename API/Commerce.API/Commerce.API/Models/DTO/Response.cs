namespace Commerce.API.Models.DTO
{
    public class Response
    {
        public class CustomResponse<T>
        {
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
            public int TotalPages { get; set; }
            public int TotalCount { get; set; }
            public List<T> Response { get; set; }
        }

        public class CustomResponseOrderHeader<T>
        {
            public OrderHeader Response { get; set; }
        }
    }
}
