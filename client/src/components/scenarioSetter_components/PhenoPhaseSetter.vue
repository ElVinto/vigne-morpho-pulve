<template>
    <div v-if="$store.getters.getDataIsLoaded">

        <div class="phenoPhaseSetterView">
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

            <div id="menudv1">
        <div id="btndebut">
          <b-button id="iconedebut" variant="outline-primary" style="width:auto;" ><p>Debut</p><img src="../../assets/debut.png" style="width:200px;height:auto;"></b-button>
          <b-tooltip target="iconedebut">Debut</b-tooltip>
        </div>
        <div id="btnmilieu">
          <b-button id="iconemilieu"  variant="outline-primary" style="width:auto;" ><p>Milieu</p><img src="../../assets/milieu.png" style="width:200px;height:auto;"></b-button>
          <b-tooltip target="iconemilieu">Milieu</b-tooltip>
        </div>
        <div id="btnfin">
          <b-button id="iconefin"  variant="outline-primary" style="width:auto;"><p>Fin</p><img src="../../assets/fin.png" style="width:200px;height:auto;"></b-button>
          <b-tooltip target="iconefin">Fin</b-tooltip>
        </div> 
      </div>
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

.phenoPhaseSetterView{text-align: center;margin-left: auto;margin-right: auto;margin-top:20px}
p{background-color: black;color: blanchedalmond;
    text-align: center;
}
img{max-width: 300px;max-height: 300px;}
.phenoPhaseSetterView {grid-area: dv1;margin-top: 10px;}
#title1{grid-area: ti1;text-align: center;}
#menudv1 {grid-area: mdv1;text-align: center;margin-left: auto;margin-right: auto;}
#iconedebut{width: 100%;height: 100%;}
#iconemilieu{width: 100%;height: 100%;}
#iconefin{width: 100%;height: 100%;}
#btndebut{grid-area: btndb;width: auto;height: auto;margin: 40px;}
#btnmilieu{grid-area: btnml;width: auto;height: auto;margin: 40px;}
#btnfin{grid-area: btnfn;width: auto;height: auto;margin: 40px;}


#menudv1{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: auto 1fr;
  grid-template-rows: repeat(1,1fr);
  grid-template-areas:
    "btndb btnml btnfn";
}


</style>