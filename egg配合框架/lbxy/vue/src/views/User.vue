<template>
  <div class="home">
    <van-field label-align="left" v-model="user" label="用户名" />
    <van-field label-align="left" v-model="password" label="密码" />
    <div class="bottom">
      <van-button
        type="info"
        @click="go(btnFlag?'/user/login':'/user/register')"
      >{{btnFlag?'登陆':'注册'}}</van-button>
    </div>
    <div class="bottom_bottom">
      <span @click="change">{{btnFlag?'没有账号，去注册':'已有账号，去登陆'}}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      user: "",
      password: "",
      btnFlag: true
    };
  },
  methods: {
    change() {
      this.btnFlag = !this.btnFlag;
    },
    async go(url) {
      let { $axios, user, password, btnFlag, $router } = this;
      let res = await $axios("post", url, { user, password });
      let { code, msg, data } = res.data;
      if (!code && btnFlag) {
        window.localStorage.setItem("token", data);
        window.localStorage.setItem("username", user);
        $router.push("/main");
        return;
      }
      if (!code && !btnFlag) {
        this.btnFlag = true;
        return;
      }
      alert(msg);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 0px 20px;
}
.van-cell {
  border-bottom: solid 1px #ccc;
}
.bottom {
  text-align: center;
  margin-top: 30px;
}
.bottom_bottom {
  text-align: center;
  margin: 20px;
  span {
    cursor: pointer;
  }
}
</style>