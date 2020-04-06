'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
    async list() {
        const { ctx, app } = this;
        let data = await this.service.role.list();
        ctx.body = app.msg(0, '获取角色列表成功', data);
    }
    async remove() {
        const { ctx, app } = this;
        const { val } = ctx.request.body;
        let userList = await this.service.user.list();
        userList = userList.map(val => val.role);
        let atRoleItem = await this.service.role.findRole(val.roleId);
        if (userList.includes(atRoleItem)) {
            ctx.body = app.msg(1, '当前角色正在使用，不能删除'); return;
        }
        let res = await this.service.role.remove(val.roleId);
        let oprRes = await this.service.opr.remove(val.role);
        let navRes = await this.service.nav.remove(val.role);
        if (res.affectedRows === 1) {
            ctx.body = app.msg(0, '删除角色单项成功'); return;
        }
        ctx.body = app.msg(1, '删除角色单项失败');
    }
    async statistics() {
        const { ctx, app } = this;
        let allRole = await this.service.role.list();
        let allUser = await this.service.user.list();
        let newArr = [];
        allRole.forEach(item => {
            let obj = { value: 0, name: item.role }
            allUser.forEach(jtem => {
                if (item.role === jtem.role)
                    obj.value++;
            })
            newArr.push(obj);
        });
        ctx.body = app.msg(0, "获取图表数据成功", newArr);
    }
    async add() {
        const { ctx, app } = this;
        let { caoZuoList, role, treeList } = ctx.request.body;
        let roleList = await this.service.role.list();
        if (roleList.some(val => val.role === role)) {
            ctx.body = app.msg(0, '角色已经存在，添加失败'); return;
        }
        let insertRole = await this.service.role.add(role);
        if (insertRole.affectedRows === 1) {
            treeList.forEach(async item => await this.service.nav.addLeftType(role, item));
            caoZuoList.forEach(async item => await this.service.opr.addCaozuo(role, item));
            ctx.body = app.msg(0, '添加新角色成功');
        }
    }
}

module.exports = HomeController;
