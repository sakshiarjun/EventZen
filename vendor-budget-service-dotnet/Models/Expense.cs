using System.ComponentModel.DataAnnotations;

namespace vendor_budget_service_dotnet.Models
{
    public class Expense
    {
        [Key]
        public long Id { get; set; }

        public long BudgetId { get; set; }

        public long VendorId { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public int Status { get; set; }

        public bool Active { get; set; }
    }
}