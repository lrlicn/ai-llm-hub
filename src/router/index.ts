import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/models',
    name: 'Models',
    component: () => import('@/pages/Models/ModelList.vue'),
    meta: { title: '模型目录' }
  },
  {
    path: '/models/:id',
    name: 'ModelDetail',
    component: () => import('@/pages/Models/ModelDetail.vue'),
    meta: { title: '模型详情' }
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('@/pages/Compare/Compare.vue'),
    meta: { title: '模型对比' }
  },
  {
    path: '/scenarios',
    name: 'Scenarios',
    component: () => import('@/pages/Scenarios/ScenarioList.vue'),
    meta: { title: '场景推荐' }
  },
  {
    path: '/scenarios/:id',
    name: 'ScenarioDetail',
    component: () => import('@/pages/Scenarios/ScenarioDetail.vue'),
    meta: { title: '场景详情' }
  },
  {
    path: '/docs',
    name: 'Docs',
    component: () => import('@/pages/Docs/DocList.vue'),
    meta: { title: '知识库' }
  },
  {
    path: '/docs/:slug',
    name: 'DocDetail',
    component: () => import('@/pages/Docs/DocDetail.vue'),
    meta: { title: '' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About/About.vue'),
    meta: { title: '关于' }
  }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, _from, next) => {
  const baseTitle = 'AI 大模型资源中心';
  if (to.meta?.title) {
    document.title = `${to.meta.title} - ${baseTitle}`;
  } else {
    document.title = baseTitle;
  }
  next();
});

