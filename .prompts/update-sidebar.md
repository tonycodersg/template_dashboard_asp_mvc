# Update Sidebar Navigation

Add, modify, or remove menu items in the admin sidebar navigation.

## Instructions

Provide:
1. **Action**: Add, modify, or remove menu item
2. **Menu Title**: Display text for the menu
3. **Route**: URL/path for the menu item
4. **Icon**: Material Design Icon name (without 'mdi-' prefix)
5. **Type**: Single link or dropdown with submenu

## File Location

`Views/Shared/_AdminLayout.cshtml` and `Pages/Shared/_AdminLayout.cshtml`

## Menu Item Types

### 1. Single Menu Item
Simple link to a single page
```html
<li class="sidebar-item">
    <a class="sidebar-link waves-effect waves-dark" href="/Admin/{Action}">
        <i class="mdi mdi-{icon-name}"></i>
        <span class="hide-menu">{Menu Title}</span>
    </a>
</li>
```

### 2. Dropdown Menu with Submenu
Menu item that expands to show sub-items
```html
<li class="sidebar-item">
    <a class="sidebar-link has-arrow waves-effect waves-dark" href="#" aria-expanded="false">
        <i class="mdi mdi-{icon-name}"></i>
        <span class="hide-menu">{Menu Title}</span>
    </a>
    <ul aria-expanded="false" class="collapse first-level">
        <li class="sidebar-item">
            <a href="/Admin/{Action1}" class="sidebar-link">
                <i class="mdi mdi-{icon-1}"></i>
                <span class="hide-menu"> {Submenu 1}</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a href="/Admin/{Action2}" class="sidebar-link">
                <i class="mdi mdi-{icon-2}"></i>
                <span class="hide-menu"> {Submenu 2}</span>
            </a>
        </li>
    </ul>
</li>
```

## Common Icons Reference

| Category | Icon Name | Usage |
|----------|-----------|-------|
| Dashboard | `view-dashboard` | Main dashboard |
| Users | `account-multiple` | User management |
| Products | `package-variant` | Product catalog |
| Orders | `cart` | Order management |
| Reports | `chart-line` | Analytics/Reports |
| Settings | `settings` | Settings pages |
| Email | `email` | Email/Messages |
| Notifications | `bell` | Notifications |
| Files | `file-document` | Documents |
| Calendar | `calendar` | Events/Schedule |
| Database | `database` | Data management |
| Security | `shield-check` | Security settings |
| Printer | `printer` | Print services |

Find more at: https://materialdesignicons.com/

## Example Usage

### Example 1: Add Single Menu Item
**Request:**
```
Add menu item:
- Title: Products
- Route: /Admin/Products
- Icon: package-variant
```

**Result:**
```html
<li class="sidebar-item">
    <a class="sidebar-link waves-effect waves-dark" href="/Admin/Products">
        <i class="mdi mdi-package-variant"></i>
        <span class="hide-menu">Products</span>
    </a>
</li>
```

### Example 2: Add Dropdown Menu
**Request:**
```
Add dropdown menu:
- Title: E-Commerce
- Icon: cart
- Submenu:
  - Products (/Admin/Products, icon: package-variant)
  - Orders (/Admin/Orders, icon: receipt)
  - Customers (/Admin/Customers, icon: account-multiple)
```

**Result:**
```html
<li class="sidebar-item">
    <a class="sidebar-link has-arrow waves-effect waves-dark" href="#" aria-expanded="false">
        <i class="mdi mdi-cart"></i>
        <span class="hide-menu">E-Commerce</span>
    </a>
    <ul aria-expanded="false" class="collapse first-level">
        <li class="sidebar-item">
            <a href="/Admin/Products" class="sidebar-link">
                <i class="mdi mdi-package-variant"></i>
                <span class="hide-menu"> Products</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a href="/Admin/Orders" class="sidebar-link">
                <i class="mdi mdi-receipt"></i>
                <span class="hide-menu"> Orders</span>
            </a>
        </li>
        <li class="sidebar-item">
            <a href="/Admin/Customers" class="sidebar-link">
                <i class="mdi mdi-account-multiple"></i>
                <span class="hide-menu"> Customers</span>
            </a>
        </li>
    </ul>
</li>
```

## Current Sidebar Structure

The sidebar is located in:
```html
<aside class="left-sidebar" data-sidebarbg="skin5">
    <div class="scroll-sidebar">
        <nav class="sidebar-nav">
            <ul id="sidebarnav" class="p-t-30">
                <!-- Menu items go here -->
            </ul>
        </nav>
    </div>
</aside>
```

## Best Practices

1. **Group Related Items**: Use dropdowns for related functionality
2. **Consistent Icons**: Use icons that match the function
3. **Clear Labels**: Use short, descriptive menu titles
4. **Logical Order**: Place frequently used items near the top
5. **Update Both Layouts**: Remember to update both MVC and Razor Pages layouts

## Steps to Update

1. Open both layout files:
   - `Views/Shared/_AdminLayout.cshtml`
   - `Pages/Shared/_AdminLayout.cshtml`
2. Locate the `<ul id="sidebarnav">` section
3. Add/modify/remove menu items
4. Save and test the navigation
5. Verify both MVC views and Razor Pages work correctly

## Active Menu State

The sidebar automatically highlights the active page based on the current URL. No additional code needed.
