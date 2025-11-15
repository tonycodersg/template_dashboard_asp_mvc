var sms_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        searchSms(true);

        $('#btnSearchSms').on("click", function () {
            searchSms(true);
        });

        $('#ddlShowPage').on("change", function () {
            noti_app.configs.pageSize = $(this).val();
            noti_app.configs.pageIndex = 1;
            searchSms(true);
        });

        $('#btnDownloadSms').on("click", function () {
            downloadSms();
        })
    }

    function searchSms(isPageChanged) {
        var template = $('#table-template-list-sms').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/Sms/SearchSms?pageIndex=' + noti_app.configs.pageIndex + '&pageSize=' + noti_app.configs.pageSize +
                '&Phone=' + $('#Phone').val() + '&Provider=' + $('#Provider').val() + '&Type=' + $('#Type').val(),
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                if (data.rowCount == 0) {
                    $('#tbl-list-sms').html('');
                } else {
                    $.each(data.results, function (i, item) {
                        render += Mustache.render(template, {
                            No: item.no,
                            Phone: item.phone,
                            TypeText: item.typeText,
                            Message: item.message,
                            Provider: item.provider !== 'DEFAULT' ? item.provider : 'BaohiemPTI',
                            IsExecutedText: item.isExecutedText,
                            CreatedDate: item.date
                        });
                        if (render !== '') {
                            $('#tbl-list-sms').html(render);
                        }
                    });
                    wrapPaging(data.rowCount, function () {
                        searchSms();
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

    function downloadSms() {
        let url = '/Sms/DownloadReport?Phone=' + $('#Phone').val() + '&Provider=' + $('#Provider').val() + '&Type=' + $('#Type').val();
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