// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from 'vue-router';

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

const store = {
  debug: 'true',
  state: {
    user: 'true'
  },
  setUser: function(user){
    console.log(this)
    console.log(user);
    this.state.user = user;
  },
  logout: function(){
    this.state.user = null;
  }
}

store.setUser = store.setUser.bind(store);
store.logout = store.logout.bind(store);

const fn = {
  setUser: store.setUser,
  logout: store.logout
}

new Vue({
  router,
  data: {
    app: store.state,
    fn
  }
}).$mount('#app');