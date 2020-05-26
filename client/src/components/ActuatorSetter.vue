<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <div id="actuatorSetterView">
            <b>Choisissez un actionneur :</b>
            <select v-model="selectedActuator" class="custom-select"
            style="width:auto;">
              <option
                v-for="(actuator, index) in $store.getters.getActuators"
                v-bind:key="index"
                v-bind:value="actuator"
              >
                {{ actuator }}
              </option>
            </select>
        </div>

    </div>
</template>
<script>


export default {
    

    data() {
        return {
            selectedActuator:this.$store.state.selectedActuator,
        }
    },

    watch: {
        selectedActuator : (val)=>{
            this.$store.commit("setSelectedActuator", val);
        },
    },

}
</script>
<style scoped>

p{
    text-align: center;
}


</style>