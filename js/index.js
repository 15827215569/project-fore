(function () {
    if (!localStorage.getItem('nikename')) {
        location.href = 'html/login.html'
    };
    $('#username').text(localStorage.getItem('nikename'));
    $('#exit').click(function () {
        localStorage.clear();
        location.href = 'html/login.html'
    })

}());
获取是不是管理员
if (localStorage.getItem('nikename')) {
    $.post('http://127.0.0.1:3000/api/isAdmin', {
        nikename: localStorage.getItem('nikename')
    }, function (res) {
        if (res.code === 0) {
            if (res.data.isAdmin) {
                $('#manager').css({ display: 'inline' })
            }
        }
    })
}
