<template>
    <div v-if="$store.getters.getDataIsLoaded">
        <div id="parcel">
            <b>Parcelle :</b>
            <select v-model="selectedParcelName" class="custom-select"
            style="width:auto;">
              <option
                v-for="(parcelName, index) in $store.getters.getParcelNames"
                v-bind:key="index"
                v-bind:value="parcelName"
              >
                {{ parcelName }}
              </option>
            </select>
        </div>

        <div id="actuator">
            <b>Actionneur :</b>
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

        <div id="phenoPhase">
            <b>Stade Phénologique :</b>
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


        <div id="mapParcelAreas" style="height:600px; width:45%;"
        >
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 100%; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-polygon
                    :lat-lngs="selectedTreatedParcel.area"
                    color="green"
                >
                    <l-popup :content="selectedParcelName" />
                </l-polygon>
                
            </l-map>
        </div>

        <div id="mapParcelAppliedDose" style="height:600px; width:45%;"
        >
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 100%; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-polygon
                    :lat-lngs="selectedTreatedParcel.area"
                    color="green"
                >
                    <l-popup :content="selectedParcelName" />
                </l-polygon>
                
            </l-map>
        </div>



    </div>
</template>
<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer, 
 LPolygon, LPopup
// LMarker 
} from "vue2-leaflet";

export default {
    components:{
      // map components
        LMap,
        LTileLayer,
        // LMarker,
       LPopup,
        LPolygon
    },

    data() {
        return {
            selectedParcelName:this.$store.getters.getParcelNames[0],
            selectedActuator:this.$store.getters.getActuators[0],
            selectedPhenoPhase:this.$store.getters.getPhenoPhases[0],

            

            // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', 
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            currentZoom: 18,
            currentCenter: latLng(43.658886799781214, 3.8291886498298466),
            mapOptions: {
                zoomSnap: 0.5,
            }
        }
    },


    computed:{
        selectedTreatedParcel: function(){

            if(this.$store.state.dataIsLoaded){
                console.log("polygon shown ")
                return this.$store.state.treatedParcels.get(this.selectedParcelName).get(this.selectedActuator).get(this.selectedPhenoPhase)
            }else{
                console.log("polygon not shown ")
                return []
            }
        }
    },

    async created() {
        this.selectedParcelName=this.$store.getters.getParcelNames[0]
        this.selectedActuator=this.$store.getters.getActuators[0]
        this.selectedPhenoPhase=this.$store.getters.getPhenoPhases[0]

        await this.$store.dispatch('initTreatedParcels');
        
    },

      mounted() {
    

    
    // this.$nextTick(() => {
      
    //   this.selectedParcelIdx = this.$store.state.selectedParcelIdx;
    //   this.selectedYearIdx = this.$store.state.selectedYearIdx;
    //   this.selectedWeekIdx = this.$store.state.selectedWeekIdx;

    //   this.$store.commit("incrementForceComponentUpdateCounter");

    // });
  },

    
    
}
</script>
<style scoped>

</style>