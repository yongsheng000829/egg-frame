const Service = require('egg').Service;

class UserService extends Service {
    async add(data) {
        return await this.app.mysql.insert('options_list', data);
    }
    async find(vote_id) {
        return await this.app.mysql.select('options_list', { where: { vote_id } });
    }
    async count(val) {
        let data = await this.app.mysql.select('options_list', { where: { id: val.id } });
        data[0].count++;
        data[0].timer = val.timer;
        return await this.app.mysql.update('options_list', data[0], { where: { id: val.id } });
    }
}

module.exports = UserService;