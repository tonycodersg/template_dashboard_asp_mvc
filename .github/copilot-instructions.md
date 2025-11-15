# GitHub Copilot Instructions for Admin Dashboard Template

## Project Overview
This is an ASP.NET Core 8.0 MVC admin dashboard template with Razor Pages support. The project follows modern web development practices with hot reload enabled for rapid development.

## Key Architecture Patterns

### Controllers & Views
- **Controllers**: Located in `Controllers/` folder
- **MVC Views**: Located in `Views/{ControllerName}/` folders
- **Razor Pages**: Located in `Pages/` folder
- **Shared Layouts**: `Views/Shared/_AdminLayout.cshtml` and `Pages/Shared/_AdminLayout.cshtml`

### Naming Conventions
- Controllers: `{Name}Controller.cs` (e.g., `AdminController.cs`)
- Views: `{ActionName}.cshtml` (e.g., `Index.cshtml`)
- Models: PascalCase (e.g., `ApplicationUser.cs`)
- CSS classes: Use Bootstrap conventions and Material Design Icons (mdi-)

### Project Structure Standards
```
Controllers/        # MVC Controllers with actions
Views/             # MVC Views (.cshtml files)
  Admin/           # Admin-specific views
  Shared/          # Shared layouts and partials
Pages/             # Razor Pages
Models/            # Data models and view models
wwwroot/           # Static files (CSS, JS, images)
  css/             # Custom stylesheets
  js/              # Custom JavaScript
  assets/          # Third-party assets
  lib/             # JavaScript libraries
```

## Code Generation Guidelines

### When Creating Controllers
```csharp
// Use this pattern for all controllers
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Dashboard.Controllers
{
    public class {Name}Controller : Controller
    {
        private readonly ILogger<{Name}Controller> _logger;

        public {Name}Controller(ILogger<{Name}Controller> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewData["Title"] = "{Title}";
            return View();
        }
    }
}
```

### When Creating Views
```cshtml
@{
    ViewData["Title"] = "{Page Title}";
    Layout = "~/Views/Shared/_AdminLayout.cshtml";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <div class="row page-titles">
        <div class="col-md-5 col-8 align-self-center">
            <h3 class="text-themecolor m-b-0 m-t-0">{Page Title}</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/Admin">Home</a></li>
                <li class="breadcrumb-item active">{Current Page}</li>
            </ol>
        </div>
    </div>

    <!-- Content -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">{Section Title}</h4>
                    <!-- Your content here -->
                </div>
            </div>
        </div>
    </div>
</div>
```

### UI Component Patterns

#### Statistics Cards
```cshtml
<div class="col-md-6 col-lg-3">
    <div class="card card-hover">
        <div class="box bg-info text-center">
            <h1 class="font-light text-white"><i class="mdi mdi-{icon-name}"></i></h1>
            <h6 class="text-white">{Label}</h6>
            <h2 class="text-white font-light">{Value}</h2>
        </div>
    </div>
</div>
```

#### Data Tables
```cshtml
<div class="table-responsive">
    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Column 1</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Table rows -->
        </tbody>
    </table>
</div>
```

## Technology Stack

### Backend
- **Framework**: ASP.NET Core 8.0
- **View Engines**: Razor Pages & MVC
- **ORM**: Entity Framework Core 8.0.1
- **Authentication**: ASP.NET Core Identity (optional)

### Frontend
- **CSS Framework**: Bootstrap 4/5
- **Icons**: Material Design Icons (mdi-)
- **JavaScript**: jQuery, Select2, Toastr, Chart.js
- **UI Components**: Custom admin template with sidebar navigation

### Development Tools
- **Hot Reload**: Enabled via `AddRazorRuntimeCompilation()`
- **Development Server**: Kestrel (HTTP-only in dev mode)
- **Default Port**: 5120

## Common Tasks

### Adding a New Admin Page
1. Add action method in `Controllers/AdminController.cs`
2. Create view in `Views/Admin/{ActionName}.cshtml`
3. Views automatically use admin layout via `_ViewStart.cshtml`
4. Update sidebar menu in `Views/Shared/_AdminLayout.cshtml` if needed

### Adding Custom Styles
- Add to `wwwroot/css/admin-site.css` for admin-specific styles
- Add to `wwwroot/css/site.css` for general styles
- Link in layout: `<link href="~/css/admin-site.css" rel="stylesheet" />`

### Adding Custom JavaScript
- Add to `wwwroot/js/admin-site.js` for admin-specific scripts
- Add to `wwwroot/js/site.js` for general scripts
- Link in layout: `<script src="~/js/admin-site.js"></script>`

### Modifying Sidebar Navigation
Edit `Views/Shared/_AdminLayout.cshtml` or `Pages/Shared/_AdminLayout.cshtml`:
```html
<li class="sidebar-item">
    <a class="sidebar-link" href="/Controller/Action">
        <i class="mdi mdi-icon-name"></i>
        <span class="hide-menu">Menu Label</span>
    </a>
</li>
```

## Important Configuration

### Program.cs Key Points
- `AddControllersWithViews().AddRazorRuntimeCompilation()` - Enables hot reload
- `AddRazorPages().AddRazorRuntimeCompilation()` - Enables Razor Pages hot reload
- `UseStaticFiles()` - Serves static files from wwwroot
- `MapControllerRoute()` - Configures MVC routing
- `MapRazorPages()` - Configures Razor Pages routing

### Authentication
Currently disabled for easy testing. To enable:
1. Uncomment `[Authorize]` attribute in controllers
2. Configure authentication in `Program.cs`
3. Add `app.UseAuthentication()` before `app.UseAuthorization()`

### Database
Entity Framework Core is included but not configured by default.
- Connection string: Add to `appsettings.json`
- DbContext: `Data/ApplicationDbContext.cs`
- Migrations: Run `dotnet ef migrations add InitialCreate`

## Material Design Icons Reference
Common icons used in this template:
- `mdi-view-dashboard` - Dashboard
- `mdi-account-multiple` - Users
- `mdi-settings` - Settings
- `mdi-chart-line` - Reports/Analytics
- `mdi-email` - Email
- `mdi-bell` - Notifications
- `mdi-file-document` - Documents
- `mdi-cog` - Configuration

Find more at: https://materialdesignicons.com/

## Best Practices

### Code Quality
- Use dependency injection for services
- Follow async/await patterns for I/O operations
- Use ILogger for logging
- Keep controllers thin, move business logic to services

### Security
- Always validate user input
- Use parameterized queries (EF Core does this automatically)
- Enable CORS only for trusted origins
- Use HTTPS in production

### Performance
- Use `AddRazorRuntimeCompilation()` only in Development
- Enable response caching where appropriate
- Minimize database queries (use eager loading)
- Compress static files in production

## Troubleshooting

### Views Not Updating
- Ensure `dotnet watch run` is being used
- Check that `AddRazorRuntimeCompilation()` is configured
- Clear browser cache or use incognito mode

### Static Files Not Loading
- Verify files exist in `wwwroot/` folder
- Check browser console for 404 errors
- Ensure `UseStaticFiles()` is called in `Program.cs`

### Build Errors
- Run `dotnet clean` followed by `dotnet build`
- Delete `bin/` and `obj/` folders if issues persist
- Check target framework is `net8.0` in `.csproj`

## AI Agent Guidelines

When working with this codebase:
1. **Always check existing patterns** before creating new code
2. **Follow the established folder structure** for new files
3. **Use the admin layout** for all admin pages
4. **Include breadcrumbs** in page layouts
5. **Add appropriate logging** in controller actions
6. **Use Material Design Icons** for consistency
7. **Test hot reload** after making view changes
8. **Update sidebar navigation** when adding new admin pages
9. **Keep styling consistent** with existing Bootstrap/MDI patterns
10. **Document complex logic** with comments

## Quick Reference Commands

```bash
# Development
dotnet restore              # Restore packages
dotnet build               # Build project
dotnet run                 # Run application
dotnet watch run           # Run with hot reload

# Database (when configured)
dotnet ef migrations add {Name}        # Add migration
dotnet ef database update              # Apply migrations
dotnet ef migrations remove            # Remove last migration

# Cleanup
dotnet clean               # Clean build artifacts
rm -rf bin/ obj/          # Force clean
```
