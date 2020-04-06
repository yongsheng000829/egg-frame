let jwt = require('jsonwebtoken');
let url = require('url');

function s(token, key) {
    return new Promise(res => {
        jwt.verify(token, key, (error, result) => {
            if (error) throw error;
            res(result);
        })
    })
}


module.exports = options => {
    return async (ctx, next) => {
        if (options.includes(url.parse(ctx.url).pathname)) {   //判断接口在白名单中则不进行校验，直接通过
            await next(); return;
        }
        let token = ctx.get('token');  //取出header中的token
        if (!token) {
            ctx.body = { code: 1, msg: '没有权限，请先登陆' }; return;   //不存在token直接返回
        }
        let info;
        try {
            info = await s(token, ctx.app.config.keys);         //解密
        } catch (error) {
            ctx.body = { code: 1, msg: '权限有误' }; return;     //解密失败
        }
        ctx.info = info;
        await next();
    }
}