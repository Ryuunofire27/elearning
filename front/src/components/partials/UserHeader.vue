<template lang="pug">
  .col-12.no-p.row.align-items-center.no-m
    .col-3.no-p.d-flex.justify-content-center
      .img-profile(style="background-image: url(https://pbs.twimg.com/profile_images/1033106619280891904/gwfdDs88.jpg)")
    .col-9
      span {{ user.profile.name }} {{ user.profile.lastName }}
        | &nbsp;
      label(for="check-options") x
      input#check-options.d-none(type="checkbox")
      .user-options
        div
          router-link(to="/perfil") Perfil
        div
          a(@click.prevent="logout") logout
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'UserHeader',
  computed: mapState({
    user: state => state.user.user
  }),
  methods: {
    logout(){
      this.$store.commit('user/logout')
    }
  }
}
</script>
<style>
  .img-profile{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .user-options{
    max-height: 0px;
    min-height: 0px;
    position: absolute;
    width: 80%;
    background-color: orange;
    transition: max-height 0.2s linear;
    overflow-y: hidden;
  }

  #check-options:checked ~ .user-options{
    max-height: 50px;
  }
</style>
