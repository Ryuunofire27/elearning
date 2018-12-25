<template lang="pug">
    header.header
      div
        router-link(to="/") Home 
      div Hola soy un header chidorongo
      button click me
      UserHeader(v-if="user")
      ul(v-else)
        li 
          //router-link(to="/login") Login
          button(@click="login") Login
        li 
          router-link(to="/signup") Signup
</template>
<script>
export default {
  name: 'Header',
  data: function(){
    return {
      user: null
    }
  },
  created(){
    console.log(this.$store.state.user.user)
    this.user = this.$store.state.user.user;
  },
  components: {
    'UserHeader': () => import('./UserHeader')
  },
  methods: {
    login: function(){
      this.user = this.$store.commit('user/login');
      console.log(this.user)
    }
  }
}
</script>
<style>
  .header{
    width: 100%;
    min-height: 50px;
    background-color: #41b883;
    color: #35495e;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
