'use strict';

const Controller = require('egg').Controller;
const navList = require('../../config/untils/nav');
class HomeController extends Controller {
    async index() {
        const { ctx, app } = this;
        let { role } = ctx.info;
        let roleItem = await this.service.nav.find(role);
        roleItem = roleItem.map(val => val.type);
        let roleArr = roleItem.map(item => navList[item]);
        let data = [];
        roleArr.forEach(item => {
            let index = data.findIndex(val => val.type === item.type);
            let obj = {
                title: item.title,
                key: item.key,
                to: item.to
            };
            if (index !== -1) {
                data[index].options.push(obj)
                return;
            }
            data.push({
                ...item,
                options: [
                    obj
                ]
            })
        })
        ctx.body = app.msg(0, '获取左侧导航成功', data);
    }
}

module.exports = HomeController;
