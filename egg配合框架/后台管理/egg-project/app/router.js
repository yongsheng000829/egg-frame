'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/login', controller.user.login);//登陆
  router.post('/user/register', controller.user.register);//注册
  router.get('/nav/list', controller.nav.index);//获取左侧nav
  router.get('/user/list', controller.user.list);//获取用户列表
  router.get('/role/list', controller.role.list);//获取角色列表
  router.delete('/user/delete', controller.user.remove);//删除用户单项
  router.post('/user/edit', controller.user.edit);//编辑用户单项
  router.delete('/role/delete', controller.role.remove);//删除角色单项
  router.get('/role/echarts', controller.role.statistics);//获取echarts数据
  router.post('/role/add', controller.role.add);//添加新角色
  router.get('/list/data', controller.list.data);//获取lbxx数据
};
