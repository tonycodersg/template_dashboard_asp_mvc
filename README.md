# Admin Dashboard Template - ASP.NET Core MVC

A modern, responsive admin dashboard template built with ASP.NET Core 8.0 MVC and Razor Pages. This template features a clean UI with pre-built components, based on the Betall Notification Dashboard design.

## 🚀 Features

- **Modern UI Design** - Clean and professional dashboard interface
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **MVC & Razor Pages Support** - Hybrid architecture supporting both patterns
- **Pre-built Admin Pages** - Dashboard, User Management, Settings, and more
- **Hot Reload** - Razor runtime compilation for instant view updates
- **Easy Customization** - Well-organized structure with separated concerns

## 📋 Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- Visual Studio 2022, VS Code, or JetBrains Rider
- A modern web browser

## 🛠️ Quick Start

### 1. Navigate to the Dashboard Project

```bash
cd AdminDashboardTemplate/Dashboard
```

### 2. Restore Packages and Build

```bash
dotnet restore
dotnet build
```

### 3. Run the Application

```bash
dotnet run
```

Or with hot reload (recommended for development):

```bash
dotnet watch run
```

The application will be available at: **http://localhost:5120**

## 🎯 Available Pages

### Public Pages
- **Home** - http://localhost:5120/
- **Privacy** - http://localhost:5120/Privacy

### Admin Pages
- **Admin Dashboard** - http://localhost:5120/Admin
- **User Management** - http://localhost:5120/Admin/Users
- **Settings** - http://localhost:5120/Admin/Settings
- **Configuration** - http://localhost:5120/Admin/Configuration

## 📁 Project Structure

```
dashboard_aspmvc_template/
├── AdminDashboardTemplate/
│   ├── Dashboard/                    # Main ASP.NET Core MVC project
│   │   ├── Controllers/             # MVC Controllers
│   │   ├── Views/                   # MVC Views with admin layout
│   │   ├── Pages/                   # Razor Pages
│   │   ├── Models/                  # Data models
│   │   ├── wwwroot/                 # Static files (CSS, JS, images)
│   │   ├── Program.cs              # Application entry point
│   │   ├── Dashboard.csproj        # Project file
│   │   └── README.md               # Detailed project documentation
│   └── AdminDashboardTemplate.sln  # Solution file
└── README.md                        # This file
```

## 🎨 Technologies Used

- **ASP.NET Core 8.0** - Web framework
- **Razor Pages & MVC** - View engines
- **Bootstrap 4/5** - CSS framework
- **jQuery** - JavaScript library
- **Material Design Icons** - Icon library
- **Select2, Toastr, Chart.js** - UI components
- **Entity Framework Core** - ORM (included, optional)

## 🔧 Configuration

The project is pre-configured with:
- ✅ HTTP-only mode (no HTTPS certificate required)
- ✅ Razor runtime compilation for hot reload
- ✅ Static file serving
- ✅ MVC and Razor Pages routing
- ✅ No authentication required (can be added later)

## 📝 Customization

### Modify the Sidebar Menu
Edit `Views/Shared/_AdminLayout.cshtml` or `Pages/Shared/_AdminLayout.cshtml`

### Add Custom Styles
Add to `wwwroot/css/admin-site.css`

### Add Custom JavaScript
Add to `wwwroot/js/admin-site.js`

### Create New Pages
1. Add a new action in `Controllers/AdminController.cs`
2. Create a corresponding view in `Views/Admin/`
3. Views automatically use the admin layout via `_ViewStart.cshtml`

## 🐛 Troubleshooting

### Views Not Updating?
Make sure you're using `dotnet watch run` for automatic reload.

### CSS/JS Not Loading?
Verify files exist in `wwwroot/` and check browser console for 404 errors.

### Build Errors?
Run `dotnet clean` and then `dotnet build` to rebuild the project.

## 🤖 AI Agent & MCP Support

This project includes comprehensive instructions for AI agents and MCP (Model Context Protocol) integration:

### For AI Agents
- **[Copilot Instructions](./.github/copilot-instructions.md)** - Detailed guidelines for GitHub Copilot and AI assistants working with this codebase
  - Code generation patterns
  - Architecture guidelines
  - Best practices
  - Common tasks and troubleshooting

### Reusable Prompts
- **[Project Prompts](./.prompts/README.md)** - Ready-to-use prompt templates for common tasks
  - 📄 **[Create Admin Page](./.prompts/create-admin-page.md)** - Generate complete pages with controller + view
  - 🧩 **[Add Component](./.prompts/add-component.md)** - Insert UI components (cards, tables, forms, charts)
  - 🗂️ **[Update Sidebar](./.prompts/update-sidebar.md)** - Modify navigation menu items

**Usage in Claude:**
```
Use the create-admin-page prompt to create a Products page with a data table
```

### For MCP Integration
- **[MCP Configuration](./.mcp/mcp-config.json)** - Model Context Protocol server configurations
- **[MCP Setup Guide](./.mcp/README.md)** - Complete guide for setting up:
  - GitHub MCP Server (repository operations, issues, PRs)
  - Jira MCP Server (issue tracking, project management)
  - Security best practices
  - Troubleshooting tips

### Quick MCP Setup
1. Copy `.mcp/mcp-config.json` to Claude Desktop config directory
2. Update Jira URL (if using Jira)
3. Restart Claude Desktop
4. **Authenticate via browser** when prompted (OAuth flow - no manual tokens!)

AI agents with MCP enabled can:
- Create and manage GitHub issues/PRs directly
- Track work in Jira
- Search and analyze codebase
- Automate development workflows

**Note:** All authentication happens securely via browser - no need to manually manage API tokens!

## 🤝 Contributing

Feel free to fork and customize this template for your projects!

## 📄 License

This project is based on the Betall Notification Dashboard and uses various open-source libraries.

## 🔗 Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Material Design Icons](https://materialdesignicons.com/)

---

**Built with ❤️ using ASP.NET Core 8.0**
