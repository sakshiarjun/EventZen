using Microsoft.EntityFrameworkCore;
using vendor_budget_service_dotnet.Models;
using vendor_budget_service_dotnet.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace vendor_budget_service_dotnet.Controllers
{
    [ApiController]
    [Route("api/budgets")]
    public class BudgetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BudgetController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBudgets()
        {
            return Ok(_context.Budgets.Where(b => b.Active));
        }
        [HttpPost]
        public IActionResult CreateBudget(Budget budget)
        {
            budget.Active = true;
            budget.Status = 1; // Assuming 1 is the default status for active budgets   
            _context.Budgets.Add(budget);
            _context.SaveChanges();
            return Ok(budget);
        }
    }
}