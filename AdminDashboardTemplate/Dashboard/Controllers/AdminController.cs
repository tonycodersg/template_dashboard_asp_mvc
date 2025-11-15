using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Dashboard.Controllers
{
    // TODO: Add [Authorize] attribute when authentication is configured
    public class AdminController : Controller
    {
        private readonly ILogger<AdminController> _logger;

        public AdminController(ILogger<AdminController> logger)
        {
            _logger = logger;
        }

        // GET: Admin/Index
        public IActionResult Index()
        {
            ViewData["Title"] = "Admin Dashboard";
            return View();
        }

        // GET: Admin/Users
        public IActionResult Users()
        {
            ViewData["Title"] = "User Management";
            return View();
        }

        // GET: Admin/Roles
        public IActionResult Roles()
        {
            ViewData["Title"] = "Role Management";
            return View();
        }

        // GET: Admin/Settings
        public IActionResult Settings()
        {
            ViewData["Title"] = "Settings";
            return View();
        }

        // GET: Admin/Configuration
        public IActionResult Configuration()
        {
            ViewData["Title"] = "Configuration";
            return View();
        }
    }
}
