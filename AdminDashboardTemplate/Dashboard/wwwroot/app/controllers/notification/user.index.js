var user_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        searchUser(true);

        $('#btnSearchUser').on('click', function () {
            searchUser(true);
        });

        $('#ddlShowPage').on('change', function () {
            noti_app.configs.pageSize = $(this).val();
            noti_app.configs.pageIndex = 1;
            searchUser(true);
        });

        $('body').on('click', '.btnDetailDevice', function () {
            var uuid = $(this).data('id').toString();
            console.log(uuid);
            detailDevice(uuid);
        });
    }

    function searchUser(isPageChanged) {
        var template = $('#table-template-user-tpa').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/Notification/SearchUser?page_index=' + noti_app.configs.pageIndex + '&page_size=' + noti_app.configs.pageSize + '&user_uuid=' + $('#user_uuid').val(),
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                if (data.rowCount == 0) {
                    $('#tbl-user-tpa').html('');
                } else {
                    $.each(data.results, function (i, item) {
                        render += Mustache.render(template, {
                            No: item.no,
                            EmployeeCode: item.employeeCode,
                            FullName: item.fullName,
                            Username: item.username,
                            Count: item.count,
                            CreatedDate: item.createdDateDisplay,
                            UpdatedDate: item.updatedDateDisplay,
                            Uuid: item.uuid
                        });
                        if (render !== '') {
                            $('#tbl-user-tpa').html(render);
                        }
                    });
                    wrapPaging(data.rowCount, function () {
                        searchUser();
                    }, isPageChanged);
                }
                noti_app.stopLoading();
            },
            error: function () {
                toastr.info('Đã xảy ra lỗi trong quá trình tìm kiếm dữ liệu!', 'Thông báo');
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

    function detailDevice(uuid) {
        var template = $('#table-template-list-detail-device').html();
        var render = '';
        $.ajax({
            type: 'GET',
            url: '/devices/' + uuid,
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                var data = response.data;
                if (data.rowCount == 0) {
                    $('#tbl-list-detail-device').html('');
                } else {
                    console.log(data.results);
                    $.each(data.results, function (i, item) {
                        render += Mustache.render(template, {
                            No: item.no,
                            DeviceType: item.deviceType,
                            DeviceId: item.deviceId,
                            Name: item.name,
                            Version: item.version,
                            Active: item.status,
                            StyleActive: item.status != 'Không' ? 'badge badge-success' : 'badge badge-danger'
                        });
                        if (render !== '') {
                            $('#tbl-list-detail-device').html(render);
                        }
                    });
                }
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Đã xảy ra lỗi trong quá trình tìm kiếm dữ liệu!', 'Thông báo');
                noti_app.stopLoading();
            }
        });
    }
}
