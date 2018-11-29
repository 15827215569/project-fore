$('#submit').click(function () {
    $.post('http://127.0.0.1:3000/api/login', {
        username: $("input[type='text']").val(),
        password: $("input[type='password']").val()
    }, function (res) {
        if (res.code === 0) {
            localStorage.setItem('nikename', res.data.nikename);
            location.href = '../index.html'
        } else {
            alert('登录失败，原因' + res.msg)
        }
    })
})