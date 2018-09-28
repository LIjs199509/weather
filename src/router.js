import VueRouter from 'vue-router';

import app from './app.vue';
import coming from './components/coming.vue';
import come from './components/come.vue';
import newsInfo from './components/newsInfo.vue';
import guanyu from './components/guanyu.vue';

var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/come' },
    { path: '/home', component: app },
    { path: '/come', component: come, meta: { index: 1 } },
    { path: '/chat', component: coming, meta: { index: 2 } },
    { path: '/newsInfo/:id', component: newsInfo },
    { path: '/guanyu', component: guanyu, meta: { index: 3 } }
  ],
  linkActiveClass: 'mui-active'
});

export default router;
