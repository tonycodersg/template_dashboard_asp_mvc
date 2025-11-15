# Add Component to Existing Page

Add a new component (card, table, form, chart, etc.) to an existing admin page.

## Instructions

Provide:
1. **Page Name**: Which page to modify (e.g., "Admin/Index", "Admin/Users")
2. **Component Type**: What to add (statistics card, data table, form, chart, etc.)
3. **Details**: Specific requirements for the component

## Component Types Available

### 1. Statistics Card
Shows a metric with icon and value
```cshtml
<div class="col-md-6 col-lg-3">
    <div class="card card-hover">
        <div class="box bg-{color} text-center">
            <h1 class="font-light text-white"><i class="mdi mdi-{icon}"></i></h1>
            <h6 class="text-white">{Label}</h6>
            <h2 class="text-white font-light">{Value}</h2>
        </div>
    </div>
</div>
```
Colors: `info`, `success`, `warning`, `danger`, `primary`, `cyan`

### 2. Data Table with Actions
```cshtml
<div class="card">
    <div class="card-body">
        <h4 class="card-title">{Title}</h4>
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
                    <!-- Data rows -->
                </tbody>
            </table>
        </div>
    </div>
</div>
```

### 3. Form Card
```cshtml
<div class="card">
    <div class="card-body">
        <h4 class="card-title">{Form Title}</h4>
        <form>
            <div class="form-group row">
                <label class="col-md-3 col-form-label">Label</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" placeholder="Placeholder">
                </div>
            </div>
            <!-- More form fields -->
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

### 4. Chart Card
```cshtml
<div class="card">
    <div class="card-body">
        <h4 class="card-title">{Chart Title}</h4>
        <canvas id="{chartId}" height="150"></canvas>
    </div>
</div>

@section Scripts {
    <script src="~/assets/libs/chart/chart.min.js"></script>
    <script>
        var ctx = document.getElementById('{chartId}').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line', // or 'bar', 'pie', etc.
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Dataset',
                    data: [12, 19, 3, 5, 2],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
    </script>
}
```

### 5. Alert/Notification Card
```cshtml
<div class="alert alert-{type} alert-dismissible fade show" role="alert">
    <strong>Title!</strong> Your message here.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
```
Types: `success`, `info`, `warning`, `danger`

### 6. Tab Container
```cshtml
<div class="card">
    <div class="card-body">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tab1" role="tab">Tab 1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tab2" role="tab">Tab 2</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab1" role="tabpanel">
                <p>Tab 1 content</p>
            </div>
            <div class="tab-pane" id="tab2" role="tabpanel">
                <p>Tab 2 content</p>
            </div>
        </div>
    </div>
</div>
```

### 7. Modal Dialog
```cshtml
<!-- Button trigger -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Open Modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal Title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Modal content here
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```

## Example Usage

**Request:**
```
Add a statistics card to Admin/Index showing total products
- Label: "Total Products"
- Value: 1,234
- Icon: package-variant
- Color: cyan
```

**Result:**
```cshtml
<div class="col-md-6 col-lg-3">
    <div class="card card-hover">
        <div class="box bg-cyan text-center">
            <h1 class="font-light text-white"><i class="mdi mdi-package-variant"></i></h1>
            <h6 class="text-white">Total Products</h6>
            <h2 class="text-white font-light">1,234</h2>
        </div>
    </div>
</div>
```

## Bootstrap Grid Layout

Components should be placed in proper Bootstrap grid:
```cshtml
<div class="row">
    <div class="col-12">
        <!-- Full width component -->
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <!-- Half width on medium+ screens -->
    </div>
    <div class="col-md-6">
        <!-- Half width on medium+ screens -->
    </div>
</div>

<div class="row">
    <div class="col-lg-4">
        <!-- One third on large screens -->
    </div>
    <div class="col-lg-4">
        <!-- One third on large screens -->
    </div>
    <div class="col-lg-4">
        <!-- One third on large screens -->
    </div>
</div>
```

## Steps to Add Component

1. Open the target view file: `Views/Admin/{PageName}.cshtml`
2. Locate the appropriate section or create new row
3. Add the component markup
4. Add any required scripts in `@section Scripts {}`
5. Test the page
6. Verify responsive behavior
