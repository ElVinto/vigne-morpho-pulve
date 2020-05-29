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
        <p>
            Autres mesures  à ajouter
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


.row{
    margin: 20px;
    text-align: center;
}

</style>