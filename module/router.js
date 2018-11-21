layui.define(['jquery', 'common'], function (exports) {
    var $ = layui.jquery;
    var common = layui.common;

    var router = {
        // 导航菜单，最多支持三级，因为还有判断权限，所以渲染左侧菜单很复杂，无法做到递归，你需要更多极请联系我添加，添加可以无限添加，只是无法做到递归
        managerMenus: [
            {
                name: '首页',
                url: '#!welcome',
                path: 'welcome.html'
            }, {
                name: '批次管理',
                url: '#!batch-list',
                path: 'system/batch-list.html',
                icon: 'icofont-listing-box',
                auth: '3'
            }, {
                name: '班级管理',
                url: '#!class-list',
                path: 'system/class-list.html',
                icon: 'layui-icon-flag',
                auth: '3'
            }, {
                name: '学生管理',
                url: '#!student-list',
                path: 'system/student-list.html',
                icon: 'icofont-group-students',
                auth: '3'
            }, {
                name: '教师管理',
                url: '#!teacher-list',
                path: 'system/teacher-list.html',
                icon: 'icofont-man-in-glasses',
                auth: '3',
                hr: true
            }, {
                name: '选题管理',
                url: '#!topic-select-list',
                path: 'system/topic-select-list.html',
                icon: 'icofont-pencil-alt-5',
                auth: '3'
            }, {
                name: '分发选题',
                url: '#!topic-distribute-list',
                path: 'system/topic-distribute-list.html',
                icon: 'icofont-tasks-alt',
                auth: '3',
                hr: true
            }, {
                name: '开题分组',
                url: '#!group-topic-open',
                path: 'system/group-topic-open.html',
                icon: 'icofont-hand-drag2',
                auth: '3'
            }, {
                name: '开题分组列表',
                url: '#!group-topic-open-list',
                path: 'system/group-topic-open-list.html',
                icon: 'icofont-listing-number',
                auth: '3'
            }, {
                name: '中期检查分组',
                url: '#!group-middle-check',
                path: 'system/group-middle-check.html',
                icon: 'icofont-hand-drag2',
                auth: '3'
            }, {
                name: '中期检查分组列表',
                url: '#!group-middle-check-list',
                path: 'system/group-middle-check-list.html',
                icon: 'icofont-listing-number',
                auth: '3'
            }, {
                name: '答辩分组',
                url: '#!group-last-reply',
                path: 'system/group-last-reply.html',
                icon: 'icofont-hand-drag2',
                auth: '3'
            }, {
                name: '答辩分组列表',
                url: '#!group-last-reply-list',
                path: 'system/group-last-reply-list.html',
                icon: 'icofont-listing-number',
                auth: '3',
                hr: true
            }, {
                name: '成绩统计',
                url: '#!scoreManager',
                path: 'system/score.html',
                icon: 'icofont-chart-line-alt',
                auth: '3'
            }, {
                name: '系统通知',
                url: '#!notice',
                path: 'system/notice.html',
                icon: 'layui-icon-notice',
                auth: '3'
            }, {
                name: '我的出题',
                url: '#!my-paper-topic',
                path: 'teacher/my-paper-topic.html',
                icon: 'icofont-memorial',
                auth: '2'
            }, {
                name: '选题审核',
                url: '#!topic-review',
                path: 'teacher/topic-review.html',
                icon: 'icofont-listine-dots',
                auth: '2'
            }, {
                name: '我的学生作业',
                url: '#!student-work',
                path: 'teacher/student-work.html',
                icon: 'icofont-tasks-alt',
                auth: '2',
                hr: true
            }, {
                name: '开题管理',
                url: '#!topic-open-list',
                path: 'teacher/topic-open-list.html',
                icon: 'icofont-hand-drag1',
                auth: '2'
            }, {
                name: '中期检查',
                url: '#!middle-check-list',
                path: 'teacher/middle-check-list.html',
                icon: 'icofont-hand-drag1',
                auth: '2'
            }, {
                name: '答辩管理',
                url: '#!last-reply-list',
                path: 'teacher/last-reply-list.html',
                icon: 'icofont-hand-drag1',
                auth: '2'
            }
        ],
        frontMenus: [
            {
                name: '首页',
                url: '#!welcome',
                path: 'welcome.html'
            },
            {
                name: '个人信息',
                url: '#!profile',
                path: 'student/profile.html'
            },
            {
                name: '论文管理',
                url: '#!my-paper',
                path: 'student/my-paper.html',
                subMenus: [
                    {
                        // hidden: true,
                        name: '选题',
                        url: '#!topic-select',
                        path: 'student/topic-select.html'
                    },
                    {
                        // hidden: true,
                        name: '开题管理',
                        url: '#!topic-open',
                        path: 'student/topic-open.html'
                    },
                    {
                        // hidden: true,
                        name: '中期检查',
                        url: '#!middle-check',
                        path: 'student/middle-check.html'
                    },
                    {
                        // hidden: true,
                        name: '答辩管理',
                        url: '#!last-reply',
                        path: 'student/last-reply.html'
                    },
                ]
            },
            {
                name: '成绩管理',
                url: '#!score-manager',
                path: 'student/score.html'
            },
            {
                name: '交流管理',
                url: '#!connect',
                path: 'student/connect.html'
            },
            {
                name: '示范文档',
                url: '#!doc-example',
                path: 'student/doc-example.html'
            },
            {
                name: '通知列表',
                url: '#!notice',
                path: 'student/notice.html'
            }
        ]

    }
    //输出路由配置
    exports('router', router);
});