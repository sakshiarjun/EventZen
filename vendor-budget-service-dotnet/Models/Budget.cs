using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vendor_budget_service_dotnet.Models
{
    public class Budget
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }
        [Column("event_id")]
        public long Event_Id { get; set; }

        [Column("total_cost")]
        public decimal Total_Cost { get; set; }

        [Column("estimated_revenue")]
        public decimal Estimated_Revenue { get; set; }

        [Column("profit")]
        public decimal Profit { get; set; }

        [Column("status")]
        public int Status { get; set; }

        [Column("active")]
        public bool Active { get; set; }
    }
}   