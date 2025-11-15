var printer_home_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        getPrinterDashboard();
    }

    function getPrinterDashboard() {
        $.ajax({
            type: 'GET',
            url: '/Home/PrinterDashboard',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (response) {
                var data = response.data;
                $('#totalExecutedJob').html(data.totalExecutedJob);
                $('#totalPendingJob').html(data.totalPendingJob);
            },
            error: function () {
            }
        });
    }
}
