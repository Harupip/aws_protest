import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'aws-amplify/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/HelloWorld.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const user = await getCurrentUser().catch(() => null);
    if (to.meta.requiresAuth && !user) {
      next({ name: 'auth' });
    } else if (to.name === 'auth' && user) {
      next({ name: 'home' });
    } else {
      next()
    }
  } catch {
    if (to.meta.requiresAuth) {
      next({ name: 'auth' });
    } else {
      next();
    }
  }
})

export default router
