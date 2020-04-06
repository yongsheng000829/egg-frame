const url = require('url');
const whiteList = require('../../config/untils/whiteList');
module.exports = options => {     //options=>受限名单
    return async (ctx, next) => {
        let path = url.parse(ctx.url).pathname;
        let flag = options.some(item => item.url === path);
        if (flag) {//判断是否受限
            let { role } = ctx.info;
            let res = await ctx.app.mysql.select('opr', { where: { role } });
            res = res.map(val=>val.opr);
            let operation = null;
            options.forEach(item => {
                if (item.url === path)
                    operation = item.opr;
            });
            if (res.includes(operation)) {
                await next(); return;  //身份拥有这个权限就让通过
            }
            ctx.body = ctx.app.msg(1, '你没有权限执行这个操作'); return;//没有权限执行这个操作
        }
        await next();  //不受限就通过
    }
}