layui.define(function (exports) {

    var common = {
        // base_server: 'json/', // 接口地址，实际项目请换成http形式的地址
        // base_server: '/pageManage/',
        base_server: '/pageManage/',
        tableName: 'QBIWeb',  // 存储表名
        autoRender: false,  // 窗口大小改变后是否自动重新渲染表格，解决layui数据表格非响应式的问题，目前实现的还不是很好，暂时关闭该功能
        pageTabs: false,   // 是否开启多标签
        role: {
            manager: 3,
            teacher: 2,
            student: 1
        },
        //table 返回数据解析
        tableParseData: function(res) { //res 即为原始返回的数据
            return {
                "code": res.Status, //解析接口状态
                "msg": res.Data.ErrorDes, //解析提示文本
                "count": res.Data.total, //解析数据长度
                "data": res.Data.datas //解析数据列表
            };
        },
        //table 默认请求参数
        tableRequest: {
            pageName: 'start', //页码的参数名称，默认：page
            limitName: 'pageSize' //每页数据量的参数名，默认：limit
        },
        //table 返回数据字段映射
        tableResponse: {
            // statusName: 'Status', //规定数据状态的字段名称，默认：code
            statusCode: 2000, //规定成功的状态码，默认：0
            // msgName: 'Data.ErrorDes', //规定状态信息的字段名称，默认：msg
            // countName: 'Data.total', //规定数据总数的字段名称，默认：count
            // dataName: 'Data.datas' //规定数据列表的字段名称，默认：data
        },
        // 判断是否为json
        parseJSON: function (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return obj;
                    }
                } catch (e) {
                }
            }
        },

        // 显示加载动画
        showLoading: function (element) {
            $(element).append('<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop admin-loading"></i>');
        },
        // 移除加载动画
        removeLoading: function (element) {
            $(element + '>.admin-loading').remove();
        },
        // 缓存临时数据
        putTempData: function (key, value) {
            if (value) {
                layui.sessionData('tempData', {key: key, value: value});
            } else {
                layui.sessionData('tempData', {key: key, remove: true});
            }
        },
        // 获取缓存临时数据
        getTempData: function (key) {
            return layui.sessionData('tempData')[key];
        },
        // 右侧弹出
        popupRight: function (path) {
            var param = new Object();
            param.path = path;
            param.id = 'adminPopupR';
            param.title = false;
            param.anim = 2;
            param.isOutAnim = false;
            param.closeBtn = false;
            param.offset = 'r';
            param.shadeClose = true;
            param.area = '336px';
            param.skin = 'layui-layer-adminRight';
            param.end = function () {
                layer.closeAll('tips');
            };
            popupRightIndex = common.open(param);
            return popupRightIndex;
        },
        // 关闭右侧弹出
        closePopupRight: function () {
            layer.close(popupRightIndex);
        },
        // 中间弹出
        popupCenter: function (param) {
            param.id = 'adminPopupC';
            popupCenterParam = param;
            popupCenterIndex = common.open(param);
            return popupCenterIndex;
        },
        // 关闭中间弹出并且触发finish回调
        finishPopupCenter: function () {
            layer.close(popupCenterIndex);
            popupCenterParam.finish ? popupCenterParam.finish() : '';
        },
        // 关闭中间弹出
        closePopupCenter: function () {
            layer.close(popupCenterIndex);
        },
        // 封装layer.open
        open: function (param) {
            var sCallBack = param.success;
            param.type = 1;
            param.area = param.area ? param.area : '450px';
            param.offset = param.offset ? param.offset : '120px';
            param.resize ? param.resize : false;
            param.shade ? param.shade : .2;
            param.success = function (layero, index) {
                sCallBack ? sCallBack(layero, index) : '';
                $(layero).children('.layui-layer-content').load(param.path);
            };
            return layer.open(param);
        },

        //layer open封装
        tips: function (content, target, time) {
            return layer.tips(content, target, { time: time || 3000 });
        },
        //关闭一个层
        close: function (index) {
            layer.close(index);
        },
        //显示遮罩层
        showLoading: function (time, style) {
            time = time || 0;
            style = style || 1
            return layer.load(style, { shade: [0.5, '#393D49'], time: time });
        },
        //关闭遮罩层
        closeLoading: function () {
            layer.closeAll('loading');
        },
        //弹出提示 icon类型 0:带！的提示 1:√ 2:x 3:? 4:锁 5:难过脸 6:微笑脸
        showTips: function (content, icon, time, callback) {
            icon = icon || 0;
            time = time || 3000;
            layer.msg(content, {
                icon: icon,
                time: time,
                resize: false,
                shade: 0.5,
                shadeClose: true
            }, function () {
                //do something
                if (callback) {
                    callback();
                }
            });
        },
        //与 JS alert相似
        alert: function (content, btnText, title) {
            layer.alert(content, { closeBtn: 1, btn: [btnText], title: title, resize: false })
        },
        //与JS confirm相似
        confirm: function (content, title, sureText, sureFunction, closeText, closeFunction) {
            title = title || "";

            layer.confirm(
                content, { title: title, icon: 3, btn: [sureText, closeText], resize: false },
                function (index) {//确定回调
                    if (sureFunction) {
                        sureFunction();
                    }
                    layer.close(index);
                }, function (index) {//cancel回调
                    if (closeFunction) {
                        closeFunction();
                    }
                    layer.close(index);
                });
        },
        openPath: function (path, title, width, height) {
            title = title || "";
            width = width || 500;
            height = height || 500;

            var offset = ((window.screen.height - height) * 0.3) + 'px';

            return layer.open({
                title: title
                , content: path
                , type: 1
                , offset: offset //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                , shade: 0.5 // 遮罩层透明度
                , resize: false
                , area: [width + 'px', height + 'px']
                , skin: 'layui-layer-rim'
                , success: function (layero, index) {
                    $(layero).children('.layui-layer-content').load(path);
                }
            });
        },
        openWindow: function (content, title, width, height) {
            title = title || "";
            width = width || 500;
            height = height || 500;

            var offset = ((window.screen.height - height) * 0.3) + 'px';

            return layer.open({
                title: title
                , content: content
                , type: 1
                , offset: offset //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                , shade: 0.5 // 遮罩层透明度
                , resize: false
                , area: [width + 'px', height + 'px']
                , skin: 'layui-layer-rim'
            });
        },
        openIframe: function (url, title, width, height) {
            title = title || "";
            width = width || 500;
            height = height || 500;
            var offset = ((window.screen.height - height) * 0.3) + 'px';

            return layer.open({
                title: title
                , content: url
                , type: 2
                , offset: offset //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                , shade: 0.5 // 遮罩层透明度
                , resize: false
                , area: [width + 'px', height + 'px']
                , skin: 'layui-layer-rim'
            });
        }
    };
    exports('common', common);
});
