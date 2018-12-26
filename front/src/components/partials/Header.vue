<template lang="pug">
    header.header.col-xs-12.row.no-p.no-m
      .col-md-3.col-5
        center
          router-link(to="/") Home
      .col-md-6.col-4.row.no-m
        .col-12
          center
            router-link(to="/").fnt-size4.fnt-w-b ECODE
      .col-md-3.col-3.d-flex
        UserHeader(v-if="user")
        .nav.col-12.d-flex.justify-content-around(v-else)
          router-link(to="/login") Login
          router-link(to="/signup") Signup
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data: function(){
    return {
      myUser: null
    }
  },
  created(){
    console.log(this.$store.getters['user/getUser'])
    console.log(this.$store.state.user.user)
    //this.user = this.$store.state.user.user;
  },
  computed: mapState({
    user: state => state.user.user
  }),
  components: {
    'UserHeader': () => import('./UserHeader')
  },
  methods: {
    login: function(){
      this.$store.commit('user/login');
    }
  }
}
</script>
<style>
  .header{
    width: 100%;
    min-height: 80px;
    background-color: #41b883;
    color: #35495e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .fnt-w-b{
    font-weight: bold;
  }

  .fnt-size0{
    font-size: 16px;
  }

  .fnt-size1{
    font-size: 18px;
  }

  .fnt-size2{
    font-size: 20px;
  }

  .fnt-size3{
    font-size: 22px;
  }

  .fnt-size4{
    font-size: 24px;
  }

  .no-p{
    padding: 0;
  }

  .no-m{
    margin: 0;
  }

  .nav{
    list-style: none;
  }

  .nav a{
    display: flex;
    align-items: center;
  }

  .header a{
    text-decoration: none;
  }

  a, a:focus, a:hover{
    color: inherit;
    cursor: pointer;
  }
</style>
