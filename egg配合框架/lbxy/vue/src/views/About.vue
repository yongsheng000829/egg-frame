<template>
  <div class="home">
    <div class="header">
      <span @click="back">◀</span>
    </div>
    <main class="main">
      <van-search v-model="search" placeholder="请输入搜索关键词" />
      <div class="list">
        <div v-for="(item,index) in list.filter(val=>val.title.indexOf(search)!==-1)" :key="index">
          <img :src="item.src" @click="goDetail(item.id)" alt />
          <span>
            <span>11月22日</span>
            <span>
              <van-icon name="good-job-o" />
            </span>
          </span>
          <p>{{item.title}}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapState(["list"])
  },
  methods: {
    ...mapActions(["setList"]),
    back() {
      this.$router.back(-1);
    },
    goDetail(id) {
      this.$router.push({ path: "/detail", query: { id } });
    }
  },
  created() {
    let { classify } = this.$route.query;
    this.setList({ method: "get", url: "/list/classify", data: { classify } });
  }
};
</script>

<style lang="scss">
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  div {
    width: 44%;
    margin: 0px 10px;
    font-size: 14px;
    margin-bottom: 20px;
    > span {
      display: flex;
      margin: 5px 0px;
      span {
        flex: 1;
        text-align: center;
      }
    }
    img {
      width: 100%;
    }
  }
}
</style>