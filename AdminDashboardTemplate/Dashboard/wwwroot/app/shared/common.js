var noti_app = {
    configs: {
        pageSize: 10,
        pageIndex: 1
    },
    notify: function (message, type) {

    },
    confirm: function (message, okCallback) {

    },
    startLoading: function () {
        //http://jquery.malsup.com/block/#page
        $.blockUI({ message: '<h4 style="vertical-aligh:middle"><img src="/assets/images/logo-text.png" style="width:100px" />  Đang xử lý...</h4>', css: { backgroundColor: 'none', color: '#fff', border: 'none' } });
    },
    stopLoading: function () {
        $.unblockUI();
    }
}