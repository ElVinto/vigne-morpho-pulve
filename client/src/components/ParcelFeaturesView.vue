<template>
    <div v-if="$store.getters.getDataIsLoaded">
        
        <div id="selectedParcelTrackView" style="height:600px; width:45%;"
        >
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 100%; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <div
                  v-for="(point, index) in $store.getters.getSelectedParcel.track"
                  v-bind:item="point"
                  v-bind:index="index"
                  v-bind:key="index"
                >
                  <l-circle
                      :lat-lng="point"
                      :radius=2
                      color= ''
                      
                  >
                      <l-popup content="track" />
                  </l-circle>
                </div>
            </l-map>
        </div>

        <div id="selectedParcelHeigth" style="height:600px; width:45%;">
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 100%; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />

                <l-polyline
                    :lat-lngs="$store.getters.getSelectedParcel.track"
                    color="green"
                >
                    <l-popup :content="$store.state.selectedParcelName" />
                </l-polyline>
                
            </l-map>
        </div>

        <div id="selectedParcelThickness" style="height:600px; width:45%;">
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 100%; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-polygon
                    :lat-lngs="$store.getters.getSelectedParcel.area"
                    color="red"
                >
                    <l-popup :content="$store.state.selectedParcelName" />
                </l-polygon>
                
            </l-map>
        </div>

        <div id="selectedParcelLeafWall" style="height:600px; width:45%;">
            <l-map 
                :zoom="currentZoom"
                :center="currentCenter"
                :options="mapOptions"
                style="height: 100%; "
            >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-polygon
                    :lat-lngs="$store.getters.getSelectedParcel.area"
                    color="red"
                >
                    <l-popup :content="$store.state.selectedParcelName" />
                </l-polygon>
                
            </l-map>
        </div>



    </div>
</template>
<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer, LPolygon, LPopup, LCircle, LPolyline } from "vue2-leaflet";

export default {
    components:{
      // map components
        LMap,
        LTileLayer,
        LCircle,
        LPopup,
        LPolygon,
        LPolyline
    },

    data() {
        return {
            
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
    
}
</script>
<style scoped>

</style>