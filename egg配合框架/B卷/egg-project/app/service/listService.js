const Service = require('egg').Service;

class UserService extends Service {
    async data() {
        return await this.app.mysql.select('vote_list')
    }
    async add(data) {
        return await this.app.mysql.insert('vote_list', data);
    }
}

module.exports = UserService;