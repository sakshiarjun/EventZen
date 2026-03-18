using System.ComponentModel.DataAnnotations;

namespace vendor_budget_service_dotnet.Models
{
    public class Vendor
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Service_Type { get; set; }
        public string Contact { get; set; }
        public decimal Price { get; set; }
        public int Status { get; set; }
        public bool Active { get; set; }
    }
}