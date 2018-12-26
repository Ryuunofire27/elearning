<template lang="pug">
  .modal
    .modal-spinner
</template>
<script>
export default {
  name: 'modal'
}
</script>
<style scoped>
  .modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  .modal-spinner{
    width: 20vh;
    height: 20vh;
    border-top: 7px solid #41b883;
    border-radius: 100%;
    border-bottom: #35495e 7px solid;
    -webkit-animation: rotation 1s infinite ease;
    -moz-animation: rotation 1s infinite ease;
  }

  @keyframes rotation {
		from {
				-webkit-transform: rotate(0deg);
		}
		to {
				-webkit-transform: rotate(359deg);
		}
  }
</style>

