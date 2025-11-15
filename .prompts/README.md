# Project Prompts

This folder contains reusable prompt templates for common development tasks in this ASP.NET Core MVC admin dashboard project.

## Available Prompts

### 1. 📄 [Create Admin Page](./create-admin-page.md)
Create a complete new admin page with controller action and view.

**Use when you need to:**
- Add a new page to the admin section
- Create controller + view in one go
- Follow project patterns automatically

**Example usage in Claude:**
```
Use the create-admin-page prompt to create a Products page with a table listing products
```

---

### 2. 🧩 [Add Component](./add-component.md)
Add UI components to existing pages (cards, tables, forms, charts, etc.)

**Use when you need to:**
- Add statistics cards
- Insert data tables
- Add forms or charts
- Include modals or tabs

**Example usage in Claude:**
```
Use the add-component prompt to add a statistics card showing total users to the Admin/Index page
```

---

### 3. 🗂️ [Update Sidebar](./update-sidebar.md)
Add, modify, or remove sidebar navigation menu items.

**Use when you need to:**
- Add new menu items
- Create dropdown menus
- Update menu icons or labels
- Reorganize navigation

**Example usage in Claude:**
```
Use the update-sidebar prompt to add a Products menu item with package-variant icon linking to /Admin/Products
```

---

## How to Use Prompts

### In Claude Desktop

1. **With Slash Commands** (if configured):
   ```
   /create-admin-page
   ```

2. **Direct Reference**:
   ```
   Use the create-admin-page prompt to [your specific request]
   ```

3. **Copy-Paste**:
   - Open the prompt file
   - Copy the entire content
   - Paste into Claude with your specific requirements

### With GitHub Copilot

These prompts also work as reference documentation for GitHub Copilot. Simply:
1. Open the relevant prompt file
2. Read the patterns and examples
3. Use inline comments to guide Copilot:
   ```csharp
   // Create admin page for Products following the create-admin-page pattern
   ```

## Prompt Structure

Each prompt includes:
- **Instructions**: What information to provide
- **Patterns**: Code templates and examples
- **Guidelines**: Best practices and conventions
- **Examples**: Real-world usage scenarios
- **Checklist**: Post-completion verification steps

## Creating Custom Prompts

To add your own prompts:

1. Create a new `.md` file in this folder
2. Follow the existing prompt structure:
   ```markdown
   # Prompt Title
   
   Brief description of what the prompt does.
   
   ## Instructions
   What information the user should provide.
   
   ## Examples
   Show actual usage examples.
   
   ## Best Practices
   Guidelines and conventions to follow.
   ```
3. Update this README with your new prompt
4. Test the prompt with Claude or Copilot

## Project Architecture Reference

All prompts follow these project conventions:

### File Structure
```
Dashboard/
├── Controllers/          # MVC controllers
├── Views/               # Razor views
│   ├── Admin/          # Admin views
│   └── Shared/         # Shared layouts
├── Pages/              # Razor pages
├── Models/             # Data models
└── wwwroot/            # Static files
```

### Naming Conventions
- **Controllers**: `{Name}Controller.cs`
- **Actions**: `PascalCase`
- **Views**: `{ActionName}.cshtml`
- **Routes**: `/Admin/{ActionName}`

### UI Components
- **Framework**: Bootstrap 4/5
- **Icons**: Material Design Icons (mdi-*)
- **Layout**: Admin template with sidebar

### Code Patterns
- Dependency injection for services
- ILogger for logging
- Async/await for I/O
- ViewData for page metadata

## Related Documentation

- [Copilot Instructions](../.github/copilot-instructions.md) - Comprehensive AI agent guidelines
- [MCP Configuration](../.mcp/README.md) - Model Context Protocol setup
- [Project README](../README.md) - Main project documentation

## Tips for Effective Prompt Usage

1. **Be Specific**: Provide clear requirements in your request
2. **Reference Examples**: Point to similar existing pages
3. **Mention Constraints**: List any specific requirements or limitations
4. **Iterate**: Start simple and refine based on output
5. **Combine Prompts**: Use multiple prompts for complex tasks

## Example Workflow

Creating a complete Products management section:

1. **Create the page**:
   ```
   Use create-admin-page to create a Products page with a table
   ```

2. **Add statistics**:
   ```
   Use add-component to add 3 statistics cards showing:
   - Total Products (cyan, package-variant icon)
   - Low Stock Items (warning, alert icon)
   - Out of Stock (danger, package-down icon)
   ```

3. **Update navigation**:
   ```
   Use update-sidebar to add Products menu under a new E-Commerce dropdown
   ```

## Feedback & Improvements

Found these prompts helpful? Have suggestions for new prompts?
- Create an issue in the repository
- Submit a pull request with your improvements
- Share your custom prompts with the team

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Maintainer**: Admin Dashboard Template Team
