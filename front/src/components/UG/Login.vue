<template lang="pug">
  div
    h1 Login
    form(@submit.prevent="handleLogin" autocomplete="off")
      div
        label Email
        input(type="email" name="email" autocomplete="off" v-validate="'required|email'" required)
        span {{ errors.first('email') }}
      div
        label Password
        input(type="password" name="password" required)
      div
        input(type="submit" value="Login")
</template>
<script>
export default {
  name: 'Login',
  methods: {
    handleLogin: async function(e){
      const data = {
        email: e.target.email.value,
        password: e.target.password.value
      };
      this.$store.commit('loading');
      try {
        await this.$store.dispatch('user/login', data);
        alert('Loggeo exitoso, sera redirigido a su perfil');
        this.$router.push({ path: '/perfil' })
      } catch (err) {
        alert(err);
      }
      this.$store.commit('loaded');
    }
  }
}
</script>
