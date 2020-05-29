<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <PhenoPhaseSetter></PhenoPhaseSetter>
        
        <hr/>

        <ActuatorSetter></ActuatorSetter>

        <hr/>

        <ParcelSetter></ParcelSetter>
        
    </div>
</template>
<script>
/*
  The ScenarioSetter component is in charge to set the store params
    selectedParcelName selectedActuator selectedPhenoPhase

*/

import ParcelSetter from './ParcelSetter'
import ActuatorSetter from './ActuatorSetter'
import PhenoPhaseSetter from './PhenoPhaseSetter'


export default {
    components:{
        ParcelSetter,
        ActuatorSetter,
        PhenoPhaseSetter,
        
    },
    
}
</script>
<style scoped>

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