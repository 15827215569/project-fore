$('#submit').click(function () {
    var username = $("input[name='name']").val();
    var password = $("input[type='password']").val();
    var nikename = $("input[name='nikename']").val();
    var age = $("input[name='age']").val();
    if (!(username && password && nikename && age)) {
        alert('不能为空')
    }
    else {
        $.post('http://127.0.0.1:3000/api/register', {
            username: $("input[name='name']").val(),
            password: $("input[type='password']").val(),
            nikename: $("input[name='nikename']").val(),
            age: $("input[name='age']").val(),
            sex: $("input[name='sex']:checked").val(),
            isAdmin: $("input[name='isAdmin']:checked").val()
        }, function (res) {
            if (res.code === 0) {
                alert(res.msg)
                location.href = 'login.html'
            } else {
                alert('注册失败，原因为' + res.msg)
            }
        })
    }
})