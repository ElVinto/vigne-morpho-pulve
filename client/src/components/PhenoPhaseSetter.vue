<template>
    <div v-if="$store.getters.getDataIsLoaded">

        <div id="phenoPhaseSetterView">
            <b>Choisissez un stade phénologique : </b>
            <select v-model="selectedPhenoPhase" class="custom-select"
            style="width:auto;">
              <option
                v-for="(phenoPhase, index) in $store.getters.getPhenoPhases"
                v-bind:key="index"
                v-bind:value="phenoPhase"
              >
                {{ phenoPhase }}
              </option>
            </select>
        </div>

    </div>
</template>
<script>


export default {
   
    data() {
        return {
            selectedPhenoPhase:this.$store.state.selectedPhenoPhase,
        }
    },

    watch: {
        selectedPhenoPhase : (val)=>{
            this.$store.commit("setSelectedPhenoPhase", val);
        }
    },

}
</script>
<style scoped>

p{
    text-align: center;
}


</style>