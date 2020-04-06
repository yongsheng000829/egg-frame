const jwt = require('jsonwebtoken');
const url = require('url');

function deocde(token, key) {
    return new Promise(res => {
        jwt.verify(token, key, (error, result) => {
            if (error) throw error;
            res(result);
        });
    })
}


module.exports = options => {
    return async (ctx, next) => {
        if (options.includes(url.parse(ctx.path).pathname)) { //白名单不校验
            await next(); return;
        }
        let token = ctx.get('token');
        if (token === 'now') {  //没有权限
            ctx.body = ctx.app.msg(1, '没有权限'); return;
        }
        let info;
        try {  //权限有误
            info = await deocde(token, ctx.app.config.keys);
        } catch (error) {
            ctx.body = ctx.app.msg(1, '权限有误'); return;
        }
        ctx.info = info;
        let { loginTime } = ctx.info;
        let time = new Date().getTime();
        if ((time - loginTime) / 1000 / 60 / 60 > 0.5) {
            ctx.body = ctx.app.msg(1, '权限超时，请重新登陆'); return;
        }
        await next();
    }
}