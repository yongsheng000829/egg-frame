<template>
  <div class="home">
    <el-container>
      <el-header>
        <span>工作台</span>
        <span>
          {{user}}
          <b @click="quit">退出</b>
        </span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col>
            <el-menu class="el-menu-vertical-demo">
              <el-submenu v-for="(item,index) in tabList" :key="index" :index="item.id">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(ite,ind) in item.options"
                    :index="ite.id"
                    :key="ind"
                    @click="go(ite.path)"
                  >{{ite.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      tabList: [],
      user: window.localStorage.user
    };
  },
  created() {
    this.setTabData();
  },
  components: {},
  methods: {
    async setTabData() {
      let data = await this.$axios("get", "/api/tabList");
      if (data.data.code === 0) {
        this.tabList = data.data.data;
      }
    },
    go(path) {
      this.$router.push(path);
    },
    quit() {
      window.localStorage.clear();
      this.$router.push("/user");
    }
  }
};
</script>




<style lang='scss'>
.el-col-12 {
  width: 100% !important;
}
.el-header {
  span:nth-child(1) {
    float: left;
  }
  span:nth-child(2) {
    float: right;
    margin-right: 50px;
    b {
      cursor: pointer;
    }
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 24px;
  height: 662px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>