'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.index);  //登陆
  router.get('/api/tabList', controller.tabList.index); //获取左侧列表
  router.get('/user/userData', controller.user.userData);//获取用户列表
  router.get('/user/delete', controller.user.remove);  //删除用户单项
  router.get('/role/data', controller.role.index); //获取身份数据
  router.post('/user/add', controller.user.add); //新增用户单项
  router.get('/user/item', controller.user.item); //编辑时获取单项信息
  router.put('/user/update', controller.user.upDate);//确定编辑修改单项
  router.get('/role/delete', controller.role.remove);//删除角色单项
  router.post('/role/add', controller.role.add)//新增角色
  router.get('/role/item',controller.role.item);//编辑角色信息获取单项
  router.put('/role/upDate',controller.role.upDate);//确定编辑角色单项
};