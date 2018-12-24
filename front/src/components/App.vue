<template lang="pug">
AppProvider(:value="app")
  div
    Header
    router-view
    Footer
</template>
<script>
import { Provider } from '../AppContext';

export default {
  name: 'App',
  props: ['app'],
  components: {
    'Header': () => import('./partials/Header'),
    'Footer': () => import('./partials/Footer'),
    'AppProvider': Provider
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
</style>
