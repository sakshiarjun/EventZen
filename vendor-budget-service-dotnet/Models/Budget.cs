using System.ComponentModel.DataAnnotations;

namespace vendor_budget_service_dotnet.Models
{
    public class Budget
    {
        [Key]
        public long Id { get; set; }
        public long EventId { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal UsedAmount { get; set; }

        public decimal RemainingAmount { get; set; }

        public int Status { get; set; }

        public bool Active { get; set; }
    }
}   