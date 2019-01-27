import Vue from 'vue'
import Router from 'vue-router'
import pullDown from '@/components/pullDown'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pullDown',
      component:pullDown
    }
  ]
})
