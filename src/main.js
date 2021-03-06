
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store'
import './resources/elementUI';
import Valine from 'valine';
import { Message } from 'element-ui';
import router from './router';
// import http from './http';
// Vue.prototype.$http = http;
Vue.config.productionTip = false
const APP_ID = 'E0zOYOk1h0wBAkNHwFeaS63z-gzGzoHsz';
const APP_KEY = 'fdFmkUavVqNrbP2PC6NRsRUj';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

// 挂载Valine为全局变量
Vue.prototype.$Valine = Valine

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireAuth)) {
//     if (localStorage.getItem('userName')) {
//       next()
//     } else {
//       Message({
//         message: "未登录, 请先登录",
//         type: "warning"
//     });
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
