layui.define(['common', 'api', 'router', 'auth', 'layer', 'laytpl', 'element', 'form'], function (exports) {
    var $ = layui.$;
    var common = layui.common;
    var auth = layui.auth;
    var api = layui.api;
    var router = layui.router;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var element = layui.element;
    var form = layui.form;

    var front = {

        // 渲染顶部导航栏
        initTopNav: function () {
            // 渲染
            $('.layui-layout-admin .layui-nav-top').load('components/navtop.html', function () {
                // 渲染
                laytpl(topNav.innerHTML).render(router.frontMenus, function (html) {
                    $('#topNav').after(html);
                });
                element.render('nav');
                front.activeNav(Q.lash);
            });
        },
        // 设置导航栏选中
        activeNav: function (url) {
            $('.layui-layout-admin .layui-nav.layui-nav-top .layui-nav-item .layui-nav-child dd').removeClass('layui-this');
            $('.layui-layout-admin .layui-nav.layui-nav-top .layui-nav-item').removeClass('layui-this');
            if (url && url != '') {
                $('.layui-layout-admin .layui-nav.layui-nav-top .layui-nav-item').removeClass('layui-nav-itemed');
                var $a = $('.layui-layout-admin .layui-nav.layui-nav-top a[href="#!' + url + '"]');
                $a.parent('li').addClass('layui-this');  // 一级菜单
                $a.parent('dd').addClass('layui-this');  // 二级菜单
                // $a.parent('dd').parent('.layui-nav-child').parent('.layui-nav-item').addClass('layui-nav-itemed');  // 二级菜单
            }
        },
        // 使用递归循环注册
        regRouter: function (menus) {
            $.each(menus, function (i, data) {
                if (data.url && data.url.indexOf('#!') == 0) {
                    Q.reg(data.url.substring(2), function () {
                        var menuId = data.url.substring(2);
                        var menuPath = 'components/' + data.path;
                        front.loadView(menuId, menuPath, data.name);
                    });
                }
                if (data.subMenus) {
                    front.regRouter(data.subMenus);
                }
            });
        },
        // 路由注册
        initRouter: function () {
            front.regRouter(router.frontMenus);
            Q.init({
                index: 'welcome'
            });
        },
        // 路由加载组件
        loadView: function (menuId, menuPath, menuName) {
            var contentDom = '.layui-layout-admin .layui-body';
            common.showLoading('.layui-layout-admin .layui-body');

            $(contentDom).load(menuPath, function () {
                element.render('breadcrumb');
                // form.render('select');
                common.removeLoading('.layui-layout-admin .layui-body');
            });
            front.activeNav(Q.lash);
        },
        // 从服务器获取登录用户的信息
        getUser: function (success) {
            layer.load(2);
            api.req('userInfo.json', {}, function (data) {
                layer.closeAll('loading');
                if (200 == data.code) {
                    auth.putUser(data.user);
                    success(data.user);
                } else {
                    layer.msg('获取用户失败', {icon: 2});
                }
            }, 'GET');
        },
    }
    exports('front', front);
});