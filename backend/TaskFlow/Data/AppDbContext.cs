using Microsoft.EntityFrameworkCore;
using TaskFlow.Entities;

namespace TaskFlow.Data
{
    public class AppDbContext : DbContext
    {
        // ------------------------------
        // db  context options
        // users
        // task Items
        // ------------------------------
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
    }
}
