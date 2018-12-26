<template lang="pug">
  div
    h1 Registro
    form(@submit.prevent="handleSignup" autocomplete="off")
      div
        label Email
        input(type="email" name="email" autocomplete="off" v-validate="'required|email'" required)
        span {{ errors.first('email') }}
      div
        label Nombres
        input(type="text" name="name" autocomplete="off" v-validate="'required'" required)
        span {{ errors.first('name') }}
      div
        label Apellidos
        input(type="text" name="lastName" autocomplete="off" required)
      div
        label Password
        input(type="password" name="password" autocomplete="off" required)
      div
        label Confirmar Password
        input(type="password" name="confirmPassword" required)
      div
        input(type="submit" value="Registrarse")
</template>
<script>
export default {
  name: 'Singup',
  methods: {
    handleSignup: async function(e){
      const data = {
        email: e.target.email.value,
        name: e.target.name.value,
        lastName: e.target.lastName.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value
      }
      if(data.password != data.confirmPassword){
        return alert('Las contraseñas no coinciden, asegurese de que las haya escrito iguales')
      }
      this.$store.commit('loading');
      try {
        await this.$store.dispatch('user/register', data);
        alert('Registro exitoso sera redirigido a su perfil');
      } catch (err) {
        alert(err);
      }
      this.$store.commit('loaded');
    }
  }
}
</script>
