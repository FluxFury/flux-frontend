import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/index.vue'

const routes = [
  { path: '/', component: IndexView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router