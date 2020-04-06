const Service = require('egg').Service;

class UserService extends Service {
    async addCaozuo(role, val) {
        return await this.app.mysql.insert('opr', { role, opr: val });
    }
    async remove(role) {
        return await this.app.mysql.delete('opr', { role });
    }
}

module.exports = UserService;