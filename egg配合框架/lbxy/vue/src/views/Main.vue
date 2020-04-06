<template>
  <div class="home">
    <header class="header">
      <span class="header_left">
        <van-icon :name="icon" @click="open" />
      </span>
      蜡笔小新
    </header>
    <main class="main">
      <div v-for="(item,index) in list" class="item" @click="enter(item.classify)" :key="index">
        <img :src="item.src" alt />
        <span>{{item.title}}</span>
      </div>
      <van-popup position="left" v-model="show">
        <div class="dialog_wrapper">
          <div :style="{width:'100%',height:'40px'}"></div>
          <h2>Hi! {{user}}</h2>
          <button @click="exit">退出登陆</button>
        </div>
      </van-popup>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      user: window.localStorage.username,
      show: false,
      icon: "setting-o"
    };
  },
  methods: {
    ...mapActions(["setList"]),
    open() {
      this.show = !this.show;
      this.icon = this.show ? "arrow-left" : "setting-o";
    },
    exit() {
      if (confirm("确定要退出吗?")) {
        window.localStorage.clear();
        this.$router.push("/");
      }
    },
    enter(classify) {
      this.$router.push({ path: "/about", query: { classify } });
    }
  },
  created() {
    this.setList({ method: "get", url: "/list/data" });
  },
  computed: {
    ...mapState(["list"])
  }
};
</script>


<style lang="scss">
.header_left {
  position: fixed;
  z-index: 3000;
  left: 5%;
  top: 1%;
  font-size: 22px;
}
.van-popup--left {
  width: 85%;
  height: 100%;
  background: white;
}
.van-overlay {
  background: #ccc;
}

.dialog_wrapper {
  width: 100%;
  height: 100%;
  background: white;
}
.home {
  width: 100%;
  height: 100%;
  div.item {
    width: 100%;
    height: 150px;
    position: relative;
    margin: 20px 0px;
    border-radius: 30px;
    span {
      position: absolute;
      top: 4%;
      left: 2%;
      color: red;
    }
    img {
      width: 100%;
      border-radius: 30px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>