var account_login_controller = function () {
    this.initialize = function () {
        registerEvents();
    }

    function registerEvents() {
        $('#btnLogin').on('click', function () {
            login();
        });

        $('#btnLoginSso').on('click', function () {
            loginSso();
        });
    }

    function login() {
        $.ajax({
            type: 'POST',
            url: '/Account/LoginAdmin',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            dataType: 'json',
            success: function (response) {
                if (response.data == "OK") {

                    window.location.href = '/Home/Index'
                }
                else {
                    toastr.error('Đăng nhập thất bại!', 'Thông báo');
                }
            },
            error: function () {
                toastr.error('Đăng nhập thất bại!', 'Thông báo');
            }
        });
    }

    function loginSso() {
        $.ajax({
            type: 'POST',
            url: '/Account/LoginSSO',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            dataType: 'json',
            success: function (response) {
                if (response.data == "OK") {

                    window.location.href = '/Home/Index'
                }
                else {
                    toastr.error('Đăng nhập thất bại!', 'Thông báo');
                }
            },
            error: function () {
                toastr.error('Đăng nhập thất bại!', 'Thông báo');
            }
        });
    }
}
