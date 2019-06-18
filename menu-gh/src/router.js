import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import DashBoard from '@/components/Meetup/DashBoard.vue'
import Model from '@/views/Model.vue'
import LoadBooks from '@/components/User/LoadBooks.vue'
import LoadClients from '@/components/User/LoadClients.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/model/:alias',
      name: 'model',
      component: Model
    },
    {
      path: '/loadBooks',
      name: 'LoadBooks',
      component: LoadClients
    }
  ]
})
