import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main/Main.vue'
import GeekToBuy from '@/views/GeekToBuy/GeekToBuy.vue'
import GeekTalk from '@/views/GeekTalk/GeekTalk.vue'
import GeekLove from '@/views/GeekLove/GeekLove.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        isPublic: true
      },
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'GeekTalk',
        component: GeekTalk,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/GeekToBuy',
        name: 'GeekToBuy',
        component: GeekToBuy,
        meta: {
          isPublic: true
        }
      },
      {
        path: '/GeekLove',
        name: 'GeekLove',
        component: GeekLove,
        meta: {
          isPublic: true
        }
      },
      ]
    },

  ]
})
export default router
