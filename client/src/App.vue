<template>
  <div id="app">
    <my-header />
     <router-view />
     <my-footer />
  </div>
</template>

<script>

import footer from "./components/Footer";
import header from "./components/Header";

export default {
  name: 'App',

  components: {
   "my-footer": footer, 
   "my-header": header, 
  },

  async created() {
    await this.$store.dispatch('initTreatedParcels');
  },
}
</script>

<style>
</style>
