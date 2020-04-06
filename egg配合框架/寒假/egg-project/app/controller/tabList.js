'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        let tabList = require('../../config/tabList');
        let tokenList = await this.service.role.find(ctx.info.role);
        tokenList = tokenList[0].token.split(',')
        let arr = tokenList.map(item => tabList[item]);
        let newList = [];
        arr.forEach(item => {
            let index = newList.findIndex(jtem => jtem.type === item.type);
            if (index !== -1) {
                newList[index].options.push({
                    title: item.title,
                    path: item.path,
                    id: item.id
                })
                return;
            }
            newList.push({
                title: item.title,
                type: item.type,
                id: item.id,
                icon: item.icon,
                options: [
                    {
                        title: item.title,
                        path: item.path,
                        id: item.id
                    }
                ]
            })
        })
        ctx.body = { code: 0, msg: '获取左侧列表数据成功', data: newList };
    }
}

module.exports = HomeController;
