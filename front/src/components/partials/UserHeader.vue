<template lang="pug">
AppConsumer
  div(slot-scope="app")
    div
      img
    div
      button(@click="app.fn.logout") logout
</template>
<script>
import { Consumer as AppConsumer } from "../../AppContext";

export default {
  name: 'UserHeader',
  components: {
    'AppConsumer': AppConsumer
  }
}
</script>
