<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="用户账号">
        <el-input v-model="formLabelAlign.user"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>

      <el-form-item label="角色名称">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.roleId"
            :label="item.role"
            :value="item.role"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="adduser_bottom">
      <el-button @click="submit" round>提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      options: [],
      value: "",
      type: "add",
      formLabelAlign: {
        user: "",
        password: ""
      }
    };
  },
  created() {
    this.setOptions();
    this.setType();
  },
  methods: {
    async setOptions() {
      let res = await this.$axios("get", "/role/data");
      if (res.data.code === 0) {
        this.options = res.data.data;
      }
    },
    async setType() {
      let userId = this.$route.query.userId;
      if (userId) {
        let res = await this.$axios("get", "/user/item", { userId });
        let { data } = res.data;
        this.type = "edit";
        this.formLabelAlign.user = data.user;
        this.formLabelAlign.password = data.password;
        this.formLabelAlign.userId = data.userId;
        this.value = data.role;
      }
    },
    async submit() {
      let { value, formLabelAlign, $axios, $router } = this;
      if (formLabelAlign.user == "") {
        alert("用户账号不能为空");
        return;
      }
      if (formLabelAlign.password == "") {
        alert("用户密码不能为空");
        return;
      }
      if (value == "") {
        alert("角色名称不能为空");
        return;
      }
      formLabelAlign.role = value;
      let method = this.type === "add" ? "post" : "put";
      let url = this.type === "add" ? "/user/add" : "/user/update";
      let res = await $axios(method, url, { formLabelAlign });
      alert(res.data.msg);
      if (res.data.code === 0) {
        $router.push("/home/userlist");
      }
    }
  }
};
</script>

<style lang="scss">
.adduser_bottom {
  text-align: center;
}
</style>