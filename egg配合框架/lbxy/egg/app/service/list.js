const Service = require('egg').Service;

class UserService extends Service {
    async data() {
        return await this.app.mysql.select('list');
    }
    async findClassifyList(classify) {
        return await this.app.mysql.select('list_two', { where: { classify } });
    }
    async detail(id) {
        return await this.app.mysql.select('list_two', { where: { id } });
    }
}

module.exports = UserService;