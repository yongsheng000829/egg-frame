const Service = require('egg').Service;

class UserService extends Service {
    async data() {
        return await this.app.mysql.select('role');
    }
    async find(role) {
        return await this.app.mysql.select('role', { where: { role } });
    }
    async add(item) {
        return await this.app.mysql.insert('role', { ...item });
    }
    async remove(roleId) {
        return await this.app.mysql.delete('role', { roleId });
    }
    async item(roleId) {
        return await this.app.mysql.select('role', { where: { roleId } });
    }
    async upDate(item) {
        return await this.app.mysql.update('role', item, { where: { roleId: item.roleId } });
    }
}

module.exports = UserService;