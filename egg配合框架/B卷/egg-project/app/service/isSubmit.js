const Service = require('egg').Service;

class UserService extends Service {
    async find(vote_id, user_id) {
        return await this.app.mysql.select('vote_user_list', { where: { vote_id, user_id } });
    }
    async add(vote_id, user_id) {
        return await this.app.mysql.insert('vote_user_list', { vote_id, user_id });
    }
    async count(vote_id) {
        return await this.app.mysql.select('vote_user_list', { where: { vote_id } });
    }
}

module.exports = UserService;