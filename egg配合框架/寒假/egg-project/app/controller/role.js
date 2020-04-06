'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = { code: 0, msg: '获取身份列表成功', data: await this.service.role.data() };
    }
    async remove() {
        const { ctx } = this;
        const { roleId } = ctx.query;
        let res = await this.service.role.remove(roleId);
        if (res.affectedRows === 1) {
            ctx.body = { code: 0, msg: '删除角色单项成功' };
            return;
        }
        ctx.body = { code: 1, msg: '删除角色单项失败' };
    }
    async add() {
        const { ctx } = this;
        let { item } = ctx.request.body;
        let res = await this.service.role.add(item);
        if (res.affectedRows === 1) {
            ctx.body = { code: 0, msg: '新增角色成功' }; return;
        }
        ctx.body = { code: 1, msg: '新增角色失败' };
    }
    async item() {
        const { ctx } = this;
        const { roleId } = ctx.query;
        let res = await this.service.role.item(roleId);
        ctx.body = { code: 0, msg: '获取角色单项成功', data: res[0] };
    }
    async upDate() {
        const { ctx } = this;
        const { item } = ctx.request.body;
        let res = await this.service.role.upDate(item);
        if (res.affectedRows) {
            ctx.body = { code: 0, msg: '修改角色单项成功' }; return;
        }
        ctx.body = { code: 1, msg: '修改角色单项失败' };
    }
}

module.exports = HomeController;
