var printer_service_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        searchDevices(true);

        $('#btnSearchDevice').on('click', function () {
            searchDevices(true);
        });

        $('#ddlShowPage').on("change", function () {
            noti_app.configs.pageSize = $(this).val();
            noti_app.configs.pageIndex = 1;
            searchDevices(true);
        });

        $('body').on('click', '.btnDetailLog', function () {
            var sms_id = $(this).data('id').toString();
            //detailLog(sms_id);
        });
    }

    function searchDevices(isPageChanged) {
        var template = $('#table-template-list-log-provider').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/Printer/SearchDevices?pageIndex=' + noti_app.configs.pageIndex + '&pageSize=' + noti_app.configs.pageSize +
                '&DeviceName=' + $('#DeviceName').val() + '&PrinterName=' + $('#PrinterName').val(),
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                if (data.rowCount == 0) {
                    $('#tbl-list-log-provider').html('');
                }
                else if (!response.status) {
                    toastr.error(data, 'Thông báo');
                }
                else {
                    $.each(data.results, function (i, item) {
                        render += Mustache.render(template, {
                            no: item.no,
                            id: item.id,
                            printerName: item.printerName,
                            deviceName: item.deviceName,
                            registerDateText: item.registerDateText,
                            shutdownDateText: item.shutdownDateText,
                            statusText: item.statusText,
                            styleActive: item.isActive ? 'badge badge-success' : 'badge badge-danger'
                        });
                        if (render !== '') {
                            $('#tbl-list-log-provider').html(render);
                        }
                    });
                    wrapPaging(data.rowCount, function () {
                        searchDevices();
                    }, isPageChanged);
                }
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Đã xảy ra lỗi trong quá trình tìm kiếm dữ liệu!', 'Thông báo');
                noti_app.stopLoading();
            }
        });
    }

    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / noti_app.configs.pageSize);

        if ($('#paginationUL a').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }

        $('#paginationUL').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Tiếp',
            last: 'Cuối',
            onPageClick: function (event, p) {
                noti_app.configs.pageIndex = p;
                setTimeout(callBack(), 200);
            }
        });
    }
}
