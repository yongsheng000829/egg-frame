let url = require('url');
let jwt = require('jsonwebtoken');

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
        if (options.includes(url.parse(ctx.url).pathname)) {
            await next(); return;
        }
        let token = ctx.get('token');
        if (token === 'now') {
            ctx.body = ctx.app(1, '没有权限'); return;
        }
        let info;
        try {
            info = await decode(token, ctx.app.config.keys);
        } catch{
            ctx.body = ctx.app(1, '权限有误'); return;
        }
        ctx.info = info;
        await next();
    }
}