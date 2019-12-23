
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store'
import './resources/elementUI';
import Valine from 'valine';
import { Message } from 'element-ui';
import router from './router';
Vue.config.productionTip = false
const APP_ID = 'E0zOYOk1h0wBAkNHwFeaS63z-gzGzoHsz';
const APP_KEY = 'fdFmkUavVqNrbP2PC6NRsRUj';
var AV = require('leancloud-storage');

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
// 挂载leancloud为全局变量, 如挂载到Vue原型上，会导致Valine无法使用
window.AV = AV

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
