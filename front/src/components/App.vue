<template lang="pug">
  .col-xs-12
    Header
    .container
      transition(name="fade")
        router-view
    Footer
    Modal(v-if="$store.state.isLoading")
</template>
<script>
export default {
  name: 'App',
  props: ['app'],
  components: {
    'Header': () => import('./partials/Header'),
    'Footer': () => import('./partials/Footer'),
    'Modal': () => import('./partials/Modal')
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>
