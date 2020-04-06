'use strict';

const Controller = require('egg').Controller;
const msg = require('../../config/untils/message');
class HomeController extends Controller {
    async data() {
        const { ctx } = this;
        let data = await this.service.list.data();
        ctx.body = msg(0, '获取主页数据成功', data);
    }
    async classify() {
        const { ctx } = this;
        const { classify } = ctx.query;
        let data = await this.service.list.findClassifyList(classify);
        ctx.body = msg(0, '获取分类数据成功', data);
    }
    async detail() {
        const { ctx } = this;
        const { id } = ctx.query;
        let data = await this.service.list.detail(id);
        ctx.body = msg(0, '获取详情数据成功', data);
    }
}

module.exports = HomeController;
