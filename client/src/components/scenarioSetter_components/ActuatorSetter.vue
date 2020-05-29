<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <div class="actuatorSetterView">
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

            <div class="menuImg">
        <div id="btnpul1">
        <b-button id="iconepul1" variant="outline-primary" ><p>Voûte pneumatique «4 mains,4 canons» Nouvelle génération</p><img src="../../assets/pul1.png" style="width:300px;height:auto;"></b-button>
        <b-tooltip target="iconepul1">Voûte pneumatique «4 mains,4 canons» Nouvelle génération </b-tooltip>
        </div>
        
        <div id="btnpul2">
        <b-button id="iconepul2"  variant="outline-primary"  ><p>Face par face Technologie jet porté</p><img src="../../assets/pul2.png" style="width:300px;height:auto;"></b-button>
        <b-tooltip target="iconepul2">Face par face Technologie jet porté </b-tooltip>
        </div>
        
        <div id="btnpul3" >
        <b-button id="iconepul3" variant="outline-primary" ><p>Panneaux récupérateurs Technologie jet porté</p><img src="../../assets/pul3.png" style="width:300px;height:auto;"></b-button>
        <b-tooltip target="iconepul3">Panneaux récupérateurs Technologie jet porté</b-tooltip>
        </div>
      </div>
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
p{background-color: black;color: blanchedalmond;height: 50px;
    text-align: center;
}

.actuatorSetterView {text-align: center;margin-left: auto;margin-right: auto;}
#btnpul1{grid-area: btnpl1;width: 300px;height: auto;margin-top: 40px;text-align: center;margin-left:auto;margin-right: auto;}
#btnpul2{grid-area: btnpl2;width: 300px;height: auto;margin-top: 40px;text-align: center;margin-left:auto;margin-right: auto;}
#btnpul3{grid-area: btnpl3;width: 300px;height: auto;margin-top: 40px;text-align: center;margin-left:auto;margin-right: auto;}
.menuImg{
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: auto 1fr;
  grid-template-rows: repeat(1,1fr);
  grid-template-areas:
     "btnpl1 btnpl2 btnpl3";
}




</style>