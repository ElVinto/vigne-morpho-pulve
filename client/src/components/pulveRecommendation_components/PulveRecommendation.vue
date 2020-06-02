<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <div class="row" >
            <div class="col-lg-6" >
                <ParcelFeatures v-bind:feat="leafWallArea"></ParcelFeatures>
            </div>
            <div class="col-lg-6" >
                <ParcelAppliedDose></ParcelAppliedDose>
            </div>
        </div>

        <div  style="width: auto;">
    <b-button to="/scenario" variant="primary" style="width: auto;"><b>Selectionner nouveau scenario</b></b-button>     
    </div>
        <p>
            TODO Autres mesures à ajouter (Demander à Anice)
        </p>
    </div>
</template>
<script>

import ParcelFeatures from "../morphoFeatures_components/ParcelFeatures"
import ParcelAppliedDose from "./ParcelAppliedDose"


export default {
    data() {
    return {
        leafWallArea:"leafWallArea",
    }
},

    components:{
      // map components
        ParcelFeatures,
        ParcelAppliedDose
    },
    
}
</script>
<style scoped>

p{
    text-align: center;
}
.row{
    margin: 20px;
    text-align: center;
}

</style>