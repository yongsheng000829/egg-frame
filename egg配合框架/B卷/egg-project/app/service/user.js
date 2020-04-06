const Service = require('egg').Service;

class UserService extends Service {
    async findUser(username) {
        return await this.app.mysql.select('user_list', { where: { username } })
    }
    async add(registerData) {
        return await this.app.mysql.insert('user_list', registerData);
    }
}

module.exports = UserService;