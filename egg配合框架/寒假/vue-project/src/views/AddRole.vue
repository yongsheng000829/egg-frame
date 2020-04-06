<template>
  <div>
    <div class="addrole_top">
      <span>角色名称</span>
      <el-input v-model="role" placeholder="请输入内容"></el-input>
    </div>
    <div :style="{marginBottom:'20px'}">视图权限</div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :default-expanded-keys="[10,20]"
      :default-checked-keys="pitchArr"
      @check-change="handleNodeClick"
    ></el-tree>
    <div :style="{marginTop:'30px',textAlign:'center'}">
      <el-button type="success" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: "",
      pitchArr: [],
      data: [
        {
          id: 10,
          label: "用户管理",
          children: [
            {
              id: 1,
              label: "用户列表",
              role: 1
            },
            {
              id: 2,
              label: "添加用户",
              role: 2
            }
          ]
        },
        {
          id: 20,
          label: "角色管理",
          children: [
            {
              id: 3,
              label: "角色列表",
              role: 3
            },
            {
              id: 4,
              label: "添加角色",
              role: 4
            }
          ]
        }
      ],
      roleId: this.$route.query.roleId ? this.$route.query.roleId : undefined,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    if (this.roleId) this.createdData();
  },
  methods: {
    handleNodeClick(val, type) {
      let str = String(val.role);
      if (type) {
        if (val.role && this.pitchArr.indexOf(str) == -1) {
          this.pitchArr.push(str);
        }
      } else {
        val.role && this.pitchArr.splice(this.pitchArr.indexOf(val.role), 1);
      }
    },
    async createdData() {
      let { $axios, roleId } = this;
      let res = await $axios("get", "/role/item", { roleId });
      let { data, code } = res.data;
      if (code === 0) {
        this.pitchArr = data.token.split(",");
        this.role = data.role;
      }
    },
    async submit() {
      let { $axios, pitchArr, role, $router, roleId } = this;
      let method = roleId ? "put" : "post";
      let url = roleId ? "/role/upDate" : "/role/add";
      let res = await $axios(method, url, {
        item: { role, roleId, token: pitchArr.join(",") }
      });
      if (res.data.code === 0) {
        $router.push("/home/rolelist");
      }
    }
  }
};
</script>

<style lang="scss">
.addrole_top {
  line-height: 46px;
  span {
    float: left;
    margin-right: 20px;
  }
  input {
    float: right;
  }
}
.el-input {
  width: 70%;
}
</style>