var sms_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        $('#btnSendSms').on("click", function () {
            sendSms();
            index();
        })
    }

    function sendSms() {
        $.ajax({
            type: 'POST',
            url: '/Sms/Send',
            data: {
                To: $('#Phone').val(),
                Type: $("input:radio[name=Type]:checked").val(),
                Message: $('#Message').val(),
                BranchName: $('#BranchName').val(),
                TimeExpiredOtp: $('#TimeExpiredOtp').val() + $('#TypeTime').val()
            },
            dataType: 'json',
            beforeSend: function () {
                noti_app.startLoading();
            },
            success: function (response) {
                if (response.data == "OK") {
                    toastr.success('Gửi tin nhắn thành công!', 'Thông báo');
                }
                else {
                    toastr.info('Gửi tin nhắn thất bại!', 'Thông báo');
                }
                noti_app.stopLoading();
            },
            error: function () {
                toastr.error('Gửi tin nhắn thất bại!', 'Thông báo');
                noti_app.stopLoading();
            }
        })
    }

    function index() {
        $.ajax({
            type: 'GET',
            url: '/Sms/Send'
        })
    }
}