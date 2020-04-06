'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async data() {
        const { ctx, app } = this;
        let data = await this.service.listService.data();
        ctx.body = app.msg(0, '获取主页数据成功', data);
    }
    async add() {
        const { ctx, app } = this;
        const { data, options } = ctx.request.body;
        data.name = ctx.info.name;
        data.qqnumber = ctx.info.qqnumber;
        data.img = ctx.info.img;
        let res = await this.service.listService.add(data);
        if (res.affectedRows === 1) {
            ctx.body = app.msg(0, '添加投票成功');
            let { insertId } = res;
            options.forEach(async item => {
                let obj = {
                    value: item.value,
                    options_id: item.id,
                    count: 0,
                    vote_id: insertId
                }
                await this.service.options.add(obj);
            });
            return;
        }
        ctx.body = app.msg(1, '添加失败');
    }
    async options() {
        const { ctx, app } = this;
        let { vote_id } = ctx.query;
        let data = await this.service.options.find(vote_id);
        let isSubmitRes = await this.service.isSubmit.find(vote_id, ctx.info.userid);
        ctx.body = app.msg(0, '获取详情数据成功', { data, isSubmit: isSubmitRes.length ? false : true });
    }
    async countAdd() {
        const { ctx, app } = this;
        let { arr, vote_id } = ctx.request.body;
        let res = await this.service.isSubmit.add(vote_id, ctx.info.userid);
        if (res.affectedRows === 1) {
            arr.forEach(async item => await this.service.options.count(item));
            ctx.body = app.msg(0, '投票成功');
            return;
        }
        ctx.body = app.msg(1, '投票失败');
    }
    async voteCount() {
        const { ctx, app } = this;
        let { vote_id } = ctx.request.body;
        let res = await this.service.isSubmit.count(vote_id);
        let data = res.length;
        ctx.body = app.msg(0, '返回几人参与成功', data);
    }
}

module.exports = HomeController;
