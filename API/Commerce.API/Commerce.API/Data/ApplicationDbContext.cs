using Commerce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Commerce.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ItemVisual> ItemVisuals { get; set; }

        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<OrderHeader> OrderHeader { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }



    }
}
