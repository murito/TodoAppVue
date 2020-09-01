<template>
  <v-app>
      <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>


<style lang="scss">
    body, html, .v-application--wrap{
        background-color: #F5F5F5!important;
    }
</style>