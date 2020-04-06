const Service = require('egg').Service;

class UserService extends Service {
    async find(user) {
        return await this.app.mysql.select('user', { where: { user } });
    }
    async data() {
        return await this.app.mysql.select('user');
    }
    async remove(userId) {
        return await this.app.mysql.delete('user', { userId });
    }
    async add(formLabelAlign) {
        return await this.app.mysql.insert('user', { ...formLabelAlign });
    }
    async item(userId) {
        return await this.app.mysql.select('user', { where: { userId } });
    }
    async upDate(formLabelAlign) {
        return await this.app.mysql.update('user', formLabelAlign, {where:{ userId: formLabelAlign.userId }});
    }
}

module.exports = UserService;