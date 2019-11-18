import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main/Main.vue'
import GeekToBuy from '@/views/GeekToBuy/GeekToBuy.vue'
import Treesays from '@/views/Treesays/Treesays.vue'
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
        name: 'Treesays',
        component: Treesays,
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
      }
      ]
    },

  ]
})
export default router
