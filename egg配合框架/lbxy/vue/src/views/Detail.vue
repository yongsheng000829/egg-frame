<template>
  <div>
    <img :src="item.src" alt />
    <h2>{{item.title}}</h2>
    <span @click="back">返回</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.setData();
  },
  methods: {
    async setData(id) {
      let res = await this.$axios("get", "/list/detail", {
        id: this.$route.query.id
      });
      let { data, msg, code } = res.data;
      if (code === 0) {
        this.item = data[0];
        return;
      }
      alert(msg);
    },
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>