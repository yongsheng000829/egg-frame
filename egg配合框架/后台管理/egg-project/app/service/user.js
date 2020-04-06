const Service = require('egg').Service;

class UserService extends Service {
    async login(user) {
        return await this.app.mysql.select('user', { where: { user } });
    }
    async  register(obj) {
        return await this.app.mysql.insert('user', obj);
    }
    async list() {
        return await this.app.mysql.select('user');
    }
    async remove(userId) {
        return await this.app.mysql.delete('user', { userId });
    }
    async edit(obj) {
        return await this.app.mysql.update('user', obj, { where: { userId: obj.userId } });
    }
}

module.exports = UserService;