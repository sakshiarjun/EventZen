using System.ComponentModel.DataAnnotations;

namespace vendor_budget_service_dotnet.Models
{
    public class Vendor
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }

        public string Service_Type { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public decimal Rating { get; set; }

        public int Status { get; set; }

        public bool Active { get; set; }

        public DateTime Created_At { get; set; }

        public DateTime Modified_At { get; set; }
    }
}