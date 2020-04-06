const Service = require('egg').Service;

class UserService extends Service {
    async data() {
        return await this.app.mysql.select('list');
    }
}

module.exports = UserService;