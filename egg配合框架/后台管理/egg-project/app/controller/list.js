'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
    async data() {
        const { ctx, app } = this;
        let data = await this.service.list.data();
        console.log(data)
        ctx.body = app.msg(0, '获取lbxx数据成功', data);
    }
}

module.exports = HomeController;
