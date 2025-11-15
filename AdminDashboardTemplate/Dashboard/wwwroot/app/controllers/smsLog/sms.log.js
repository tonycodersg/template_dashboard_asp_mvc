var log_sms_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        searchLog(true);

        $('#btnSearchLog').on('click', function () {
            searchLog(true);
        });

        $('#ddlShowPage').on("change", function () {
            noti_app.configs.pageSize = $(this).val();
            noti_app.configs.pageIndex = 1;
            searchLog(true);
        });

        $('#btnExportData').on('click', function () {
            downloadSmsLog();
        });

        $('body').on('click', '.btnDetailLog', function () {
            var sms_id = $(this).data('id').toString();
            detailLog(sms_id);
        });
    }

    function searchLog(isPageChanged) {
        var template = $('#table-template-list-log-provider').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/SmsLog/SearchLogBy?pageIndex=' + noti_app.configs.pageIndex + '&pageSize=' + noti_app.configs.pageSize +
                '&Phone=' + $('#Phone').val() + '&Provider=' + $('#Provider').val() + '&Type=' + $('#Type').val() +
                '&SmsId=' + $('#SmsId').val() + '&StartDay=' + $('#StartDay').val() + '&EndDay=' + $('#EndDay').val(),
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
                            No: item.no,
                            Phone: item.phone,
                            TypeText: item.typeText,
                            SmsId: item.smsId,
                            Provider: item.provider !== 'DEFAULT' ? item.provider : 'BaohiemPTI',
                            Status: item.status,
                            CreatedDate: item.date,
                            StyleActive: item.status == 'Thành công' ? 'badge badge-success' : item.status == 'Thất bại' ? 'badge badge-danger' : 'badge badge-secondary'
                        });
                        if (render !== '') {
                            $('#tbl-list-log-provider').html(render);
                        }
                    });
                    wrapPaging(data.rowCount, function () {
                        searchLog();
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

    function detailLog(sms_id) {
        $.ajax({
            type: 'GET',
            url: '/SmsLog/GetLog?SmsId=' + sms_id,
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                $('#modal_id').html(data.id);
                $('#modal_phone').html(data.phone);
                $('#modal_typeText').html(data.typeText);
                $('#modal_smsId').html(data.smsId);
                $('#modal_provider').html(data.provider);
                $('#modal_createdDate').html(data.date);
                $('#modal_logProvider').html(data.logProvider);
                $('#modal_status').html(data.status);
                $('#modal_error').html(data.errorName);
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Đã xảy ra lỗi trong quá trình tìm kiếm dữ liệu!', 'Thông báo');
                noti_app.stopLoading();
            }
        })
    }

    function downloadSmsLog() {
        let url = '/SmsLog/DownloadReportLog?Phone=' + $('#Phone').val() + '&Provider=' + $('#Provider').val() + '&Type=' + $('#Type').val() +
            '&SmsId=' + $('#SmsId').val() + '&StartDay=' + $('#StartDay').val() + '&EndDay=' + $('#EndDay').val();
        $.ajax({
            type: 'GET',
            url: url,
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function () {
                window.location = url;
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Đã xảy ra lỗi trong quá trình tìm kiếm dữ liệu!', 'Thông báo');
                noti_app.stopLoading();
            }
        })
    }
}
