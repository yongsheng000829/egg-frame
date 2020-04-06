 <template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="roleId" label="角色ID" width="180"></el-table-column>
    <el-table-column prop="role" label="角色名称" width="180"></el-table-column>
    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-tag @click="clickRemove(scope)">删除</el-tag>
        <el-tag @click="clickEdit(scope)">编辑</el-tag>
        <el-tag>查看</el-tag>
      </template>
    </el-table-column>
  </el-table>
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
    async setData() {
      let res = await this.$axios("get", "/role/data");
      if (res.data.code === 0) {
        this.tableData = res.data.data;
      }
    },
    async clickRemove(scope) {
      let res = await this.$axios("get", "/role/delete", {
        roleId: scope.row.roleId
      });
      if (res.data.code === 0) {
        this.setData();
        return;
      }
      alert(res.data.msg);
    },
    clickEdit(scope) {
      this.$router.push({
        path: "/home/addrole",
        query: { roleId: scope.row.roleId }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  span {
    margin: 0px 10px;
    cursor: pointer;
  }
}
</style>