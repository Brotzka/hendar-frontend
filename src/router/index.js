import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Apps from '../views/Apps.vue'
import Topics from '../views/Topics.vue'
import Subscribers from '../views/Subscribers.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/apps',
      name: 'apps',
      component: Apps
    },
    {
      path: '/apps/:appId/topics',
      name: 'app-topics',
      component: Topics,
      props: true
    },
    {
      path: '/apps/:appId/subscribers',
      name: 'app-subscribers',
      component: Subscribers,
      props: true
    }
  ]
})

export default router
