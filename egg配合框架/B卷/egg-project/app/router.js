'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);//登陆
  router.post('/register', controller.user.register);//注册
  router.get('/allVote', controller.list.data);//获取数据列表
  router.post('/addVote', controller.list.add);//添加投票
  router.get('/voteData', controller.list.options);//详情数据
  router.post('/pushVote', controller.list.countAdd)//投票
  router.post('/vote/count', controller.list.voteCount);//几人参与投票
};
