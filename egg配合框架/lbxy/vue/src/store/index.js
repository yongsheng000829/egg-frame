import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../untils/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    storeList(state, data) {
      state.list = [...data];
    }
  },
  actions: {
    async  setList({ commit }, options) {
      let res = await axios(options.method, options.url, options.data);
      let { data, code, msg } = res.data;
      if (code === 0) {
        commit('storeList', data); return;
      }
      alert(msg);
    }
  }
})
