layui.define(['jquery', 'common'], function(exports){
    var $ = layui.jquery;
    var common = layui.common;

    var auth = {
        // 获取缓存的token
        getUUID: function () {
            var t = layui.data(common.tableName).token;
            if (t) {
                var token = JSON.parse(t);
                return token.access_token;
            }
        },
        // 清除user
        removeToken: function () {
            layui.data(common.tableName, {
                key: 'token',
                remove: true
            });
        },
        // 缓存token
        putToken: function (token) {
            layui.data(common.tableName, {
                key: 'token',
                value: JSON.stringify(token)
            });
        },
        // 当前登录的用户
        getUser: function () {
            var u = layui.data(common.tableName).login_user;
            if (u) {
                return JSON.parse(u);
            }
        },
        // 缓存user
        putUser: function (user) {
            layui.data(common.tableName, {
                key: 'login_user',
                value: JSON.stringify(user)
            });
        },
        // 当前登录用户角色
        getRole: function () {
            var role = layui.data(common.tableName).login_role;
            if (role) {
                return role;
            }
        },
        // 缓存角色
        putRole: function (role) {
            layui.data(common.tableName, {
                key: 'login_role',
                value: role
            });
        },
        // 页面元素绑定事件监听
        bindCommonEvent: function () {
            // 退出登录
            $('#btnLogout').click(function () {
                layer.confirm('确定退出登录？', function () {
                    $.post(common.base_server + "/userInfo/logout", {UUID:auth.getUUID()},function (data) {
                        if (data.Status == 2000) {
                            auth.removeToken();
                            location.replace('login.html');
                        } else {
                            layer.msg('未知错误，请重试', {icon: 5, time: 1000});
                        }
                    } )
                });
            });
            // 修改密码
            $('#setPsw').click(function () {
                common.openPath('components/tpl/password.html');
            });
            // 个人信息
            $('#setInfo').click(function () {
                common.openPath('components/tpl/profile.html', '' , 500, 450);
            });
            // 消息
            $('#btnMessage').click(function () {
                common.popupRight('components/tpl/message.html');
            });
        },
    }
    //输出接口
    exports('auth', auth);
});