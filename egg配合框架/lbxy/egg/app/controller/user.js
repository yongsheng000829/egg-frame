'use strict';

const Controller = require('egg').Controller;
const msg = require('../../config/untils/message');
const jwt = require('jsonwebtoken');
class HomeController extends Controller {
    async login() {
        const { ctx } = this;
        const { user, password } = ctx.request.body;
        let data = await this.service.user.find(user);
        if (!data.length) {
            ctx.body = msg(1, "用户名不存在"); return;
        }
        if (data[0].password != password) {
            ctx.body = msg(1, "密码错误"); return;
        }
        let token = jwt.sign({ ...data[0] }, ctx.app.config.keys);
        ctx.body = msg(0, '登陆成功', token);
    }
    async register() {
        const { ctx } = this;
        const { user, password } = ctx.request.body;
        let data = await this.service.user.find(user);
        if (data.length) {
            ctx.body = msg(1, "注册失败,账号已经存在"); return;
        }
        let insertData = await this.service.user.register({ user, password, role: '前端' });
        if (insertData.affectedRows === 1)
            ctx.body = msg(0, '注册成功');
    }
}

module.exports = HomeController;
