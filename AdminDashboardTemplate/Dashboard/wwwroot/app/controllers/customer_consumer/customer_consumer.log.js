var customer_consumer_controller = function () {
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

        $('body').on('click', '.btnDetailLog', function () {
            var sms_id = $(this).data('id').toString();
            detailLog(sms_id);
        });

        $('body').on('click', '.btnResendCustomer', function () {
            var sms_id = $(this).data('id').toString();
            toastr.success('Resend message ' + sms_id + ' thành công, vui lòng kiểm tra lại kết quả.', 'Thông báo');
        });
    }

    function searchLog(isPageChanged) {
        var template = $('#table-template-list-log-provider').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/CustomerConsumerData/Search?pageIndex=' + noti_app.configs.pageIndex + '&pageSize=' + noti_app.configs.pageSize +
                '&ObjectId=' + $('#ObjectId').val(),
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                $('#total_row_failed').html(data.rowCount);
                $('#total_row_get').html(data.totalMessageGet);
                $('#total_row_success').html(data.totalSuccessMessage);

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
                            Id: item.id,
                            ServiceId: item.serviceId,
                            ServiceName: item.serviceName,
                            CreatedDate: item.createdDateText,
                            StatusCode: item.statusCode
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
            url: '/CustomerConsumerData/Get?objectId=' + sms_id,
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                $('#payload_data').html(JSON.stringify(JSON.parse(data.payload), undefined, 4));
                $('#transform_data').html(JSON.stringify(JSON.parse(data.tranformModel), undefined, 4));
                $('#response_data').html(JSON.stringify(JSON.parse(data.responseFromProfile).data, undefined, 4));
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Đã xảy ra lỗi trong quá trình tìm kiếm dữ liệu!', 'Thông báo');
                noti_app.stopLoading();
            }
        });
    }
}
