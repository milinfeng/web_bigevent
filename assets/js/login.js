$(function () {
    //去注册
    $('#link_reg').on('click', function () {
        //隐藏登录框
        $('.login-box').hide();
        //显示注册框
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        //隐藏注册框
        $('.reg-box').hide();
        //显示登录框
        $('.login-box').show();

    });
    //自定义pwd的校验规则

    const form = layui.form
    form.verify({

        pwd: [/^[\S]{6,12}$/, '密码必须6到12位, 且不能出现空格'],
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则 return 一个提示消息即可
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return '两次输入密码不一致';
            }
        }

    });

    // 注册功能，监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log('注册失败', res.message);
                return layer.msg(res.message);
            }
            // console.log('注册成功！');
            layer.msg('注册成功');
            // 主动触发点击事件
            $('#link_login').click();
        });
    });


});

