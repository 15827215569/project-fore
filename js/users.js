$(function () {
    getList();
});
var currentPage = 1
//获取用户信息
function getList(page, pageSize) {
    //设置延时器，点击切换页面；
    setTimeout(function () {
        for (var i = 1; i < $('#pagination li').length - 1; i++) {
            (function (j) {
                $('#pagination li').eq(j).click(function () {
                    getList(j);
                    currentPage = j
                })
            }(i))

        }
        $('#pagination li').eq(0).click(function () {
            getList(currentPage - 1 <= 0 ? 1 : currentPage - 1)
        });
        $('#pagination li').eq($('#pagination li').length - 1).click(function () {
            getList(currentPage + 1 >= $('#pagination li').length - 2 ? $('#pagination li').length - 2 : currentPage + 1)
        });
    }, 500);
    //获取内容
    page = page || 1
    pageSize = pageSize || 5;
    currentPage = page
    $.get('http://127.0.0.1:3000/api/user/list', {
        page: page,
        pageSize: pageSize
    }, function (res) {
        if (res.code === 0) {
            //获取内容
            var list = res.data.list;
            var con = ''
            console.log(list)
            for (var i = 0; i < list.length; i++) {
                con += `
                <tr>
                <th >${5 * (currentPage - 1) + i + 1}</th>
                <th class='namecontent'>${list[i].name}</th>
                <th>${list[i].nikename}</th>
                <th>${list[i].age}</th>
                <th>${list[i].sex}</th>
                <th>${list[i].isAdmin === true ? '是' : '否'}</th>
                <th class='handle'>删除</th>
            </tr>
                `
            }
            $('#tbody').html(con);
            //获取页数
            var totalPage = res.data.totalPage;
            console.log(totalPage)
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
    console.log(target.siblings("[class='namecontent']").html())
    if (target.attr('class') == 'handle') {
        $.post('http://127.0.0.1:3000/api/user/delete', {
            name: target.siblings("[class='namecontent']").html()
        }, function (res) {
            if (res.code === -1) {
                alert('删除失败')
            } else {

                getList(currentPage);
            }

        })
    }

})



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
$.post('http://127.0.0.1:3000/api/isAdmin', {
    nikename: localStorage.getItem('nikename')
}, function (res) {
    if (res.code === 0) {
        if (res.data.isAdmin) {
            $('#manager').css({ display: 'inline' })
        }
    }
})

//模糊搜索
