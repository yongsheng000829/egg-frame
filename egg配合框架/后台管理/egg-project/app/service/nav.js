const Service = require('egg').Service;

class UserService extends Service {
    async find(role) {
        return await this.app.mysql.select('role', { where: { role } });
    }
    async addLeftType(role, val) {
        return await this.app.mysql.insert('role', { role, type: val });
    }
    async remove(role) {
        return await this.app.mysql.delete('role', { role });
    }
}

module.exports = UserService;