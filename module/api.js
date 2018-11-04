layui.define(['jquery', 'common', 'auth'], function(exports){
    var $ = layui.jquery;
    var common = layui.common;
    var auth = layui.auth;
    var api = {

        // 封装ajax请求，返回数据类型为json
        req: function (url, data, success, method) {
            if ('put' == method.toLowerCase()) {
                method = 'POST';
                data._method = 'PUT';
            } else if ('delete' == method.toLowerCase()) {
                method = 'POST';
                data._method = 'DELETE';
            }
            var token = auth.getToken();
            if (token) {
                data.access_token = token.access_token;
            }
            api.ajax({
                url: common.base_server + url,
                data: data,
                type: method,
                dataType: 'json',
                success: success,
                beforeSend: function (xhr) {
                    var token = auth.getToken();
                    if (token) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + token.access_token);
                    }
                }
            });
        },
        // 封装ajax请求
        ajax: function (param) {
            var successCallback = param.success;
            param.success = function (result, status, xhr) {
                // 判断登录过期和没有权限
                var jsonRs;
                if ('json' == param.dataType.toLowerCase()) {
                    jsonRs = result;
                } else if ('html' == param.dataType.toLowerCase() || 'text' == param.dataType.toLowerCase()) {
                    jsonRs = admin.parseJSON(result);
                }
                if (jsonRs) {
                    if (jsonRs.code == 401) {
                        auth.removeToken();
                        layer.msg('登录过期', {icon: 2, time: 1500}, function () {
                            location.replace('/login.html');
                        }, 1000);
                        return;
                    } else if (jsonRs.code == 403) {
                        layer.msg('没有权限', {icon: 2});
                        return;
                    }
                }
                successCallback(result, status, xhr);
            };
            param.error = function (xhr) {
                param.success({code: xhr.status, msg: xhr.statusText});
            };
            $.ajax(param);
        },
    }
    //输出接口
    exports('api', api);
});