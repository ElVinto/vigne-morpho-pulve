<template>
	<div class="global">
		<div class="ScenarioSetter" >
			<ScenarioSetter></ScenarioSetter>
		</div>
		<div class="MorphoFeature">
			<MorphoFeatures></MorphoFeatures>
		</div>
	</div>
</template>
<script>

import ScenarioSetter from './scenarioSetter_components/ScenarioSetter'
import MorphoFeatures from './morphoFeatures_components/MorphoFeatures'

export default {
  name: 'Welcome',

  components: {
    ScenarioSetter,
	MorphoFeatures

  },

  async created() {
    await this.$store.dispatch('initTreatedParcels');
  },
}
</script>

<style scoped>

.ScenarioSetter{padding: 10px;grid-area: sc;}
.MorphoFeature{padding: 10px;grid-area: pa;}

hr {
	display: block;
	clear: both;
	height: 0;
	margin: 40px 0 80px;
	padding: 0;
	border: 0;
	font-family: arial;
	text-align: center;
	font-size: 60px;
	line-height: 1;
}
hr:after {
	content: "\273D \273D \273D";
	height: 0;			
	letter-spacing: 1em;
	color: #aaa;
}


</style>
