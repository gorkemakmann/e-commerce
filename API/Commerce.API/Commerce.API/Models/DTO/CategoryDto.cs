namespace Commerce.API.Models.DTO
{
    public class CategoryDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ParentCategoryId { get; set; }

        public string CategoryImage { get; set; }

        public string CategoryUrl { get; set; }

        public int SortOrder { get; set; }

        public int TotalItemCount { get; set; }
    }
}
