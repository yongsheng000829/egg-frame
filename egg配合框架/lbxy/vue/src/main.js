import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Echarts from 'echarts';
import './untils/vant.config';  //按需引入vant组件
import axios from './untils/axios';  //二次封装axios
Vue.config.productionTip = false
Vue.prototype.$axios = axios;//将axios绑定到Vue的原型上
Vue.prototype.$echarts = Echarts;

router.beforeEach((to, from, next) => {
  if (!to.meta.isLogin) {
    if (!window.localStorage.token) {
      next('/'); return;
    }
  }
  next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
