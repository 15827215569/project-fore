//判断是否登录，显示用户名，设置点击退出程序
if (!localStorage.getItem('nikename')) {
    location.href = 'login.html'
}
$('#username').text(localStorage.getItem('nikename'));
$('#exit').click(function () {
    localStorage.clear();
    location.href = 'login.html'
})



//获取是不是管理员
if (localStorage.getItem('nikename')) {
    $.post('http://127.0.0.1:3000/api/isAdmin', {
        nikename: localStorage.getItem('nikename')
    }, function (res) {
        if (res.code === 0) {
            if (res.data.isAdmin) {
                $('#manager').css({ display: 'inline' })
            } else {
                $('#usersCon').css({ display: 'none' })
            }
        }
    })
}
//添加品牌页面显示和隐藏
$('#addphone').click(function () {
    $('#addphone-box').css({ display: 'block' })
});
$('#noadd').click(function () {
    $('#addphone-box').css({ display: 'none' })
})

//添加手机
$('#isadd').click(function () {
    $.post('http://127.0.0.1:3000/api/addbrand', {
        name: $('#name').val(),
    }, function (res) {
        if (res.code === 0) {
            $('#addphone-box').css({ display: 'none' })
            getBrand();
        } else {
            alert('插入失败')
        }
    })
})

//获取手机信息

$(function () {
    getBrand();
});
var currentPage = 1

function getBrand(page, pageSize) {
    //设置延时器，点击切换页面；
    setTimeout(function () {
        for (var i = 1; i < $('#pagination li').length - 1; i++) {
            (function (j) {
                $('#pagination li').eq(j).click(function () {
                    getBrand(j);
                    currentPage = j
                })
            }(i))

        }
        $('#pagination li').eq(0).click(function () {
            getBrand(currentPage - 1 <= 0 ? 1 : currentPage - 1)
        });
        $('#pagination li').eq($('#pagination li').length - 1).click(function () {
            getBrand(currentPage + 1 >= $('#pagination li').length - 2 ? $('#pagination li').length - 2 : currentPage + 1)
        });
    }, 500);
    //获取内容
    page = page || 1
    pageSize = pageSize || 5;
    currentPage = page
    $.get('http://127.0.0.1:3000/api/getbrand', {
        page: page,
        pageSize: pageSize,
    }, function (res) {
        if (res.code === 0) {
            //获取内容
            var list = res.data.list;
            var con = ''
            console.log(list)
            console.log('haha')
            for (var i = 0; i < list.length; i++) {
                con += `
                <tr>
                <th >${5 * (currentPage - 1) + i + 1}</th>
                <th>这是LOGO</th>
                <th class='namecontent'>${list[i].name}</th>
                <th class='handle'><span class='delete'>删除</span></th>
            </tr>
                `
            }
            $('#tbody').html(con);
            //获取页数
            var totalPage = res.data.totalPage;
            var page = res.data.page;
            var listStr = `
                    <ul class="paginationa" id="pagination">
                         <li>
                    &laquo;
                        </li>
                        `
            for (var i = 0; i < totalPage; i++) {
                listStr += `<li >${i + 1}</li>`
            }
            listStr += `              
                    <li>
                    &raquo;
                    </li>
                </ul>
                    `
            $('#list-tab').html(listStr);
            $('#pagination').children().eq(page).addClass('active');

        } else {
            alert(res.msg)
        }
    })

}

//点击删除某一条数据
$('#tbody').delegate($('.handle'), 'click', function (event) {
    var target = $(event.target);
    if (target.attr('class') == 'delete') {
        $.post('http://127.0.0.1:3000/api/brand/delete', {
            name: target.parent().siblings("[class='namecontent']").html()
        }, function (res) {
            if (res.code === -1) {
                alert('删除失败')
            } else {
                getBrand(currentPage);
            }

        })
    }

})


