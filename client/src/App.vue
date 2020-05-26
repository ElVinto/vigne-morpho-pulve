<template>
  <div id="app">
    <ScenarioSetter></ScenarioSetter>
    <hr/>
    <ParcelFeaturesView></ParcelFeaturesView>
  </div>
</template>

<script>

import ScenarioSetter from './components/ScenarioSetter.vue'
import ParcelFeaturesView from './components/ParcelFeaturesView.vue'

export default {
  name: 'App',

  components: {
    ScenarioSetter,
    ParcelFeaturesView,

  },

  async created() {
    await this.$store.dispatch('initTreatedParcels');
  },
}
</script>

<style>
</style>
