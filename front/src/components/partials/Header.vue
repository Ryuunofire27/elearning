<template lang="pug">
  AppConsumer
    header.header(slot-scope="app" :style="getData(app)")
      div
        router-link(to="/") Home 
      div Hola soy un header chidorongo {{ app.data.user }}
      button(@click="app.fn.setUser('usuario')") click me
      UserHeader(v-if="app.data.user")
      ul(v-else)
        li 
          router-link(to="/login") Login
        li 
          router-link(to="/signup") Signup
</template>
<script>
import { Consumer as AppConsumer } from "../../AppContext";
export default {
  name: 'Header',
  components: {
    AppConsumer,
    'UserHeader': () => import('./UserHeader')
  },
  methods: {
    getData: function(data){
      console.log(data);
      return ''
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
