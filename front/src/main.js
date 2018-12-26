// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VeeValidate);

const router = new VueRouter({
  routes: [
    {
      path: '/', component: () => import('./components/App'),
      props: true,
      children: [
        {
          path: '', component: () => import('./components/UG/Home')
        },
        {
          path: 'login', component: () => import('./components/UG/Login')
        },
        {
          path: 'signup', component: () => import('./components/UG/Signup')
        },
        {
          path: 'perfil', component: () => import('./components/U/Perfil'),
          meta: { requiresAuth: true }
        },
        {
          path: '*', component: () => import('./components/UG/NotFound')
        }
      ]
    }
  ],
  mode: 'history'
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    try {
      await store.dispatch('user/authenticate');
      return next();
    } catch (err) {
      alert(err);
      return next('/login');
    }
    
  } else {
    if((to.fullPath == '/login' || to.fullPath == 'signup') && store.state.user.user){
      return next('/perfil');
    }
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */

new Vue({
  router,
  store,
}).$mount('#app');