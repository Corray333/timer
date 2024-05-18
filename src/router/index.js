import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/timer', name:'timer', component: () => import('../views/TimerView.vue') },
      { path: '/tasks', name:'tasks', component: () => import('../views/TasksView.vue') },
      { path: '/sounds', name:'sounds', component: () => import('../views/SoundsView.vue') },
    ]
  })
  
  export default router