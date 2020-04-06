'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class HomeController extends Controller {
    async login() {
        const { ctx, app } = this;
        const { user, password } = ctx.request.body;
        let res = await this.service.user.login(user);
        if (!res.length) {
            ctx.body = app.msg(1, '用户不存在'); return;
        }
        if (res[0].password != password) {
            ctx.body = app.msg(1, '密码错误'); return;
        }
        let loginTime = new Date().getTime();   //获取用户登陆的时间
        let data = jwt.sign({ ...res[0],loginTime }, app.config.keys);
        ctx.body = app.msg(0, '登陆成功', data);
    }
    async register() {
        const { ctx, app } = this;
        const { obj } = ctx.request.body;
        let res = await this.service.user.login(obj.user);
        if (res.length) {
            ctx.body = app.msg(1, '注册失败,用户已经存在'); return;
        }
        let twoRes = await this.service.user.register(obj);
        if (twoRes.affectedRows === 1)
            ctx.body = app.msg(0, '登陆成功');
    }
    async list() {
        const { ctx, app } = this;
        let data = await this.service.user.list();
        ctx.body = app.msg(0, '获取用户列表成功', data);
    }
    async remove() {
        const { ctx, app } = this;
        const { userId } = ctx.request.body;
        let res = await this.service.user.remove(userId);
        if (res.affectedRows === 1) {
            ctx.body = app.msg(0, '删除用户单项成功');
        }
    }
    async edit() {
        const { ctx, app } = this;
        const { obj } = ctx.request.body;
        let res = await this.service.user.edit(obj);
        if (res.affectedRows === 1) {
            ctx.body = app.msg(0, '编辑用户单项成功');
        }
    }
}

module.exports = HomeController;
