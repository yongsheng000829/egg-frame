<template>
  <div>
    <div class="userlist_top">
      <el-tag type="warning" @click="go">添加用户</el-tag>
    </div>
    <el-table :data="tableData" height="500" border style="width: 100%">
      <el-table-column height="50px" prop="userId" label="用户ID" width="180"></el-table-column>
      <el-table-column height="50px" prop="user" label="用户账号" width="180"></el-table-column>
      <el-table-column height="50px" prop="password" label="用户密码" width="180"></el-table-column>
      <el-table-column height="50px" prop="role" label="用户角色" width="130"></el-table-column>
      <el-table-column height="50px" label="操作" width="200">
        <template slot-scope="scope">
          <el-tag @click="clickRemove(scope)">删除</el-tag>
          <el-tag @click="clickEdit(scope)">编辑</el-tag>
          <el-tag>查看</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.setData();
  },
  methods: {
    go() {
      this.$router.push("/home/adduser");
    },
    async setData() {
      let res = await this.$axios("get", "/user/userData");
      if (res.data.code === 0) {
        this.tableData = res.data.data;
      }
    },
    async clickRemove(scope) {
      let res = await this.$axios("get", "/user/delete", {
        userId: scope.row.userId
      });
      if (res.data.code === 0) {
        this.setData();
        return;
      }
      alert(res.data.msg);
    },
    clickEdit(scope) {
      this.$router.push({
        path: "/home/adduser",
        query: { userId: scope.row.userId }
      });
    }
  }
};
</script>
<style lang="scss">
.el-tag {
  margin: 0px 5px;
}
.userlist_top {
  margin-bottom: 20px;
  span {
    cursor: pointer;
  }
}
</style>