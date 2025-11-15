# Create New Admin Page

Create a new admin page with controller and view following the project's architecture patterns.

## Instructions

When using this prompt, provide:
1. **Page Name**: The name of the page (e.g., "Products", "Orders", "Reports")
2. **Description**: Brief description of what the page does
3. **Features** (optional): Any specific features or components needed

## Steps to Execute

1. **Check if AdminController exists**
   - If not, create it with proper structure
   - If yes, add new action method

2. **Create Controller Action**
   - Add action method in `Controllers/AdminController.cs`
   - Include proper logging
   - Set ViewData["Title"]

3. **Create View File**
   - Create view in `Views/Admin/{PageName}.cshtml`
   - Use admin layout: `Layout = "~/Views/Shared/_AdminLayout.cshtml"`
   - Include breadcrumb navigation
   - Add card container structure

4. **Update Sidebar Navigation** (optional)
   - Add menu item in `Views/Shared/_AdminLayout.cshtml`
   - Use appropriate Material Design Icon

## Example Usage

**User Input:**
```
Page Name: Products
Description: Manage product inventory
Features: List products, add new product button
```

**Expected Output:**

### 1. Controller Action
File: `Controllers/AdminController.cs`
```csharp
// GET: Admin/Products
public IActionResult Products()
{
    ViewData["Title"] = "Product Management";
    return View();
}
```

### 2. View File
File: `Views/Admin/Products.cshtml`
```cshtml
@{
    ViewData["Title"] = "Product Management";
}

<div class="container-fluid">
    <!-- Breadcrumb -->
    <div class="row page-titles">
        <div class="col-md-5 col-8 align-self-center">
            <h3 class="text-themecolor m-b-0 m-t-0">Product Management</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/Admin">Home</a></li>
                <li class="breadcrumb-item active">Products</li>
            </ol>
        </div>
        <div class="col-md-7 col-4 align-self-center">
            <div class="d-flex m-t-10 justify-content-end">
                <button type="button" class="btn btn-info">
                    <i class="fa fa-plus"></i> Add New Product
                </button>
            </div>
        </div>
    </div>

    <!-- Content -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Product List</h4>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Product rows will be added here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 3. Sidebar Menu Item (Optional)
Add to `Views/Shared/_AdminLayout.cshtml`:
```html
<li class="sidebar-item">
    <a class="sidebar-link waves-effect waves-dark" href="/Admin/Products">
        <i class="mdi mdi-package-variant"></i>
        <span class="hide-menu">Products</span>
    </a>
</li>
```

## Architecture Guidelines

### Controller Pattern
- Use dependency injection for services
- Add ILogger for logging
- Keep actions thin
- Use async/await for I/O operations
- Return IActionResult

### View Pattern
- Always set ViewData["Title"]
- Use consistent breadcrumb structure
- Wrap content in `.container-fluid`
- Use Bootstrap grid system
- Include appropriate icons (mdi-*)
- Add action buttons in page titles section

### Naming Conventions
- Controller: PascalCase (e.g., `AdminController`)
- Action: PascalCase (e.g., `Products`)
- View: Match action name (e.g., `Products.cshtml`)
- Route: `/Admin/{ActionName}` (e.g., `/Admin/Products`)

## Component Templates

### Statistics Card
```cshtml
<div class="col-md-6 col-lg-3">
    <div class="card card-hover">
        <div class="box bg-info text-center">
            <h1 class="font-light text-white"><i class="mdi mdi-icon-name"></i></h1>
            <h6 class="text-white">Label</h6>
            <h2 class="text-white font-light">Value</h2>
        </div>
    </div>
</div>
```

### Form Card
```cshtml
<div class="card">
    <div class="card-body">
        <h4 class="card-title">Form Title</h4>
        <form>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Field Name</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="Enter value">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-9 offset-md-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="button" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</div>
```

### Data Table
```cshtml
<div class="table-responsive">
    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Data</td>
                <td>Data</td>
                <td>
                    <button class="btn btn-sm btn-info"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Material Design Icons Reference

Common icons to use:
- `mdi-view-dashboard` - Dashboard
- `mdi-account-multiple` - Users
- `mdi-package-variant` - Products
- `mdi-cart` - Orders
- `mdi-chart-line` - Reports
- `mdi-settings` - Settings
- `mdi-file-document` - Documents
- `mdi-email` - Email
- `mdi-bell` - Notifications

Find more at: https://materialdesignicons.com/

## Post-Creation Checklist

- [ ] Controller action created with proper signature
- [ ] View file created in correct folder
- [ ] Breadcrumb navigation added
- [ ] Page title set correctly
- [ ] Layout reference correct
- [ ] Sidebar menu updated (if needed)
- [ ] Build and test the page
- [ ] Check for any console errors
- [ ] Verify responsive design
