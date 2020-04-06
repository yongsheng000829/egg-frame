const jwt = require('jsonwebtoken');
const url = require('url');
const msg = require('../../config/untils/message');

function decode(token, keys) {
    return new Promise(res => {
        jwt.verify(token, keys, (error, result) => {
            if (error) throw error;
            res(result);
        })
    })
}


module.exports = options => {
    return async (ctx, next) => {
        //在白名单不进行校验
        if (options.includes(url.parse(ctx.url).pathname)) {
            await next(); return;
        }
        let token = ctx.get('token');
        //没有用户权限
        if (token === 'now') {
            ctx.body = msg(1, '用户身份不存在，请先登陆'); return;
        }
        let info;
        //身份校验失败
        try {
            info = decode(token, ctx.app.config.keys);
        } catch (error) {
            ctx.body = msg(1, '权限错误'); return;
        }
        ctx.info = info;
        await next();
    }
}