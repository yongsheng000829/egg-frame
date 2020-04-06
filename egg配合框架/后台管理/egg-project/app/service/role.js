const Service = require('egg').Service;

class UserService extends Service {
    async list() {
        return await this.app.mysql.select('roleList');
    }
    async findRole(roleId) {
        let res = await this.app.mysql.select('roleList', { where: { roleId } });
        return res[0].role;
    }
    async remove(roleId) {
        return await this.app.mysql.delete('roleList', { roleId });
    }
    async add(role){
        return await this.app.mysql.insert('roleList',{role})
    }
}

module.exports = UserService;