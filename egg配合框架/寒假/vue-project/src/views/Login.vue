<template>
  <div class="about">
    <div class="about-box">
      <p>权限管理系统</p>
      <el-input v-model="user" placeholder="用户名"></el-input>
      <br />
      <br />
      <br />
      <el-input v-model="password" placeholder="密码"></el-input>
      <br />
      <br />
      <br />
      <el-button :style="{width:'350px'}" @click="login" type="success">登陆</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let { user, password, $axios, $router } = this;
      let res = await $axios("post", "/user/login", { user, password });
      if (res.data.code === 0) {
        window.localStorage.setItem("user", user);
        window.localStorage.setItem("token", res.data.token);
        $router.push("/home");
        return;
      }
      alert(res.data.msg);
    }
  }
};
</script>
