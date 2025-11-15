var printer_executed_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        searchJob(true);

        $('#btnSearchJob').on('click', function () {
            searchJob(true);
        });

        $('#ddlShowPage').on("change", function () {
            noti_app.configs.pageSize = $(this).val();
            noti_app.configs.pageIndex = 1;
            searchJob(true);
        });

        $('body').on('click', '.btn-printed', function () {
            var sms_id = $(this).data('id').toString();
            retryPrint(sms_id);
        });
    }

    function searchJob(isPageChanged) {
        var template = $('#table-template-list-log-provider').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/Printer/SearchJob?pageIndex=' + noti_app.configs.pageIndex + '&pageSize=' + noti_app.configs.pageSize +
                '&PrinterDeviceName=' + $('#PrinterDeviceName').val() + '&PrinterName=' + $('#PrinterName').val() + '&ContractId=' + $('#ContractId').val()
                + '&PrinterType=' + $('#PrinterType').val() + '&IsPendingJob=false',
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
                            id: item.id,
                            no: item.no,
                            printerName: item.printerName,
                            printerType: item.printerType,
                            filePath: item.filePathDisplay,
                            contractId: item.contractId,
                            printerDeviceName: item.printerDeviceName,
                            createdDateText: item.createdDateText,
                            pagePrint: (item.fromPage ?? '') + '-' + (item.toPage ?? ''),
                            duplex: item.isDuplex ? 'mdi mdi-check' : 'mdi mdi-close',
                            horizontal: item.isHorizontal ? 'mdi mdi-check' : 'mdi mdi-close',
                            fileType: item.fileType
                        });
                        if (render !== '') {
                            $('#tbl-list-log-provider').html(render);
                        }
                    });
                    wrapPaging(data.rowCount, function () {
                        searchJob();
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

    function retryPrint(id) {
        $.ajax({
            type: 'GET',
            url: '/Printer/RetryPrintJob?jobId=' + id.toString(),
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                if (data == 'ok') toastr.success('Đã tạo lại lệnh in mới', 'Thông báo');
                else toastr.error('Đã xảy ra lỗi trong quá trình tạo lại bản in!', 'Thông báo');
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Đã xảy ra lỗi trong quá trình tạo lại bản in!', 'Thông báo');
                noti_app.stopLoading();
            }
        });
    }
}
