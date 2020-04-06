'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login); //登陆
  router.post('/user/register', controller.user.register); //注册
  router.get('/list/data', controller.list.data);//获取主页数据
  router.get('/list/classify', controller.list.classify);//获取分类数据
  router.get('/list/detail', controller.list.detail);//详情数据
};
