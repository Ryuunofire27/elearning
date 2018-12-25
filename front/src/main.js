// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from 'vue-router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);

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
        }
      ]
    }
  ],
  mode: 'history'
});

/* eslint-disable no-new */

new Vue({
  router,
  store,
}).$mount('#app');