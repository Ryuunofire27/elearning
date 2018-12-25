<template lang="pug">
  div
    Header
    router-view
    Footer
</template>
<script>
export default {
  name: 'App',
  props: ['app'],
  components: {
    'Header': () => import('./partials/Header'),
    'Footer': () => import('./partials/Footer'),
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>
