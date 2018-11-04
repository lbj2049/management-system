# 前端页面


## 简介

> 基于jquery、layui的管理系统模板，单页面、响应式、支持mvvm、极易上手！


## 使用框架 

描述 | 框架 
:---|:---
核心框架 | [Layui](http://www.layui.com/)、[jQuery](http://jquery.cuishifeng.cn/)
路由框架 | [Q.js](https://github.com/itorr/q.js) (纯js轻量级路由框架)
mvvm框架 | [pandyle.js](https://gitee.com/pandarrr/pandyle) (专为jquery编写的mvvm)
主要特色 | 单页面 / 响应式 / 简约 / 极易上手

## 项目结构

```
|-assets
|     |-css                     // 样式
|     |-images                  // 图片
|     |-libs                    // 第三方库
|
|-components            // html组件
|     |-system                  // 系统管理页面
|     |-xxxxxx                  // 其他业务页面
|     |-tpl                     // 公用组件
|     |     |-message.html                 // 消息
|     |-welcome.html            // 欢迎页
|     |-header.html             // 头部
|     |-navtop.html             // 顶部导航
|     |-side.html               // 侧导航
|
|-module                // js模块 (使用layui的模块开发方式)
|     |-admin.js                // admin模块
|     |-index.js                // index模块
|     |-api.js          //接口请求封装
|     |-auth.js         //存储信息
|     |-common.js       //公共js
|     |-front.js        //student js
|     |-index.js        //管理后台 js
|     |-router.js       //路由地址页面
|-index.html            // 管理后台界面
|-front.html            // 学生界面
|-login.html            // 登陆界面
```
