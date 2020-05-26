<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <ParcelSetter></ParcelSetter>
        
        <ActuatorSetter></ActuatorSetter>

        <PhenoPhaseSetter></PhenoPhaseSetter>
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


</style>