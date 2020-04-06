'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class HomeController extends Controller {
    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        let res = await this.service.user.findUser(username);
        if (!res.length) {
            ctx.body = app.msg(1, '账号不存在'); return;
        }
        if (res[0].password != password) {
            ctx.body = app.msg(1, '密码错误'); return;
        }
        let loginTime = new Date().getTime();
        let data = jwt.sign({ ...res[0], loginTime }, app.config.keys);
        ctx.body = app.msg(0, "登陆成功", data);
    }
    async register() {
        const { ctx, app } = this;
        const { registerData } = ctx.request.body;
        let findRes = await this.service.user.findUser(registerData.username);
        if (findRes.length) {
            ctx.body = app.msg(1, '注册失败，账号已存在'); return;
        }
        let insertRes = await this.service.user.add(registerData);
        if (insertRes.affectedRows === 1) {
            ctx.body = app.msg(0, '注册成功');
        }
    }
}

module.exports = HomeController;
