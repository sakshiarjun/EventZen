using Microsoft.EntityFrameworkCore;
using vendor_budget_service_dotnet.Models;

namespace vendor_budget_service_dotnet.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Expense> Expenses { get; set; }

    }
}