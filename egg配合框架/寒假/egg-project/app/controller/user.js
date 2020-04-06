'use strict'

const Controller = require('egg').Controller;
let jwt = require('jsonwebtoken');

module.exports = class HomeController extends Controller {
    async index() {
        let { user, password } = this.ctx.request.body;
        let data = await this.service.user.find(user);
        if (!data.length) {
            this.ctx.body = { code: 1, msg: '用户名不存在' };
            return;
        }
        if (data[0].password != password) {
            this.ctx.body = { code: 1, msg: '密码不正确' };
            return;
        }
        console.log(this.config.keys)
        this.ctx.body = { code: 0, msg: '登陆成功', token: jwt.sign({ ...data[0] }, this.config.keys) };
    }
    async userData() {
        this.ctx.body = { code: 0, msg: '获取用户列表成功', data: await this.service.user.data() }
    }
    async remove() {
        let { ctx } = this;
        let { userId } = ctx.query;
        let res = await this.service.user.remove(userId);
        if (res.affectedRows === 1) {
            ctx.body = { code: 0, msg: '删除用户单项成功' }; return;
        }
        ctx.body = { code: 1, msg: '删除用户单项失败' };
    }
    async add() {
        let { ctx } = this;
        let { formLabelAlign } = ctx.request.body;
        let userFlag = await this.service.user.find(formLabelAlign.user);
        if (userFlag.length) {
            ctx.body = { code: 1, msg: '新增失败，用户已存在' }; return;
        }
        let res = await this.service.user.add(formLabelAlign);
        if (res.affectedRows === 1) {
            ctx.body = { code: 0, msg: '新增用户单项成功' }; return;
        }
        ctx.body = { code: 1, msg: '新增用户单项失败' };
    }
    async item() {
        let { ctx } = this;
        let { userId } = ctx.query;
        let res = await this.service.user.item(userId);
        ctx.body = { code: 0, msg: '获取用户单项信息成功', data: res[0] };
    }
    async upDate() {
        let { ctx } = this;
        let { formLabelAlign } = ctx.request.body;
        let res = await this.service.user.upDate(formLabelAlign);
        if (res.affectedRows === 1) {
            ctx.body = { code: 0, msg: "编辑用户单项信息成功" }; return;
        }
        ctx.body = { code: 1, msg: '编辑用户单项信息失败' };
    }
}