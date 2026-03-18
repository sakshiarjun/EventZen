using vendor_budget_service_dotnet.Models;
using vendor_budget_service_dotnet.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace vendor_budget_service_dotnet.Controllers
{
    [ApiController]
    [Route("api/vendors")]
    public class VendorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetVendors()
        {
            return Ok(_context.Vendors.Where(v => v.Active));
        }

        [HttpPost]
        public IActionResult CreateVendor(Vendor vendor)
        {
            vendor.Active = true;
            vendor.Status = 1; // Assuming 1 is the default status for active vendors

            _context.Vendors.Add(vendor);
            _context.SaveChanges();
            return Ok(vendor);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVendor(long id)
        {
            var vendor = _context.Vendors.Find(id);
            if (vendor == null)
            {
                return NotFound();
            }
            vendor.Active = false;
            _context.SaveChanges();

            return Ok();
        }
    }
}