<template>
  <div
    class="global"
    style="background-image:url(images/AniceCheraiet-MasPiquet-LIDAR_c_INRAE-CaroleGiansily-1920x1440px.jpg) ;background-size: 2200px 800px;padding:30px;margin: 1px;height: 800px">
 
  <div id="title"><h1>Vigne morpho pulve</h1></div>
     
    
<hr>
	
	<div id="objective" class="card bg-light text-white" style="opacity:50%">
      
      <div class="card-body" >
        <center><b style="color:black;">Objectif</b></center>
        <p style="color:black;"> a remplir</p>
      </div>
    </div>
    


    <div id="btnScenario" style="width: auto;">
    <b-button to="/scenario" variant="dark" style="width: auto;"><img src="images/scenario.png"/><br><b>Sélectionner un scénario</b></b-button>     
    </div>

	<div id="btnGuide">
     <b-button id="btnGuide" variant="dark" v-b-toggle.sidebar-footer style="opacity:80%">
        <img src="images/guid.png"/><br>Mode d'emploi</b-button>
     </div>
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow>
      <template v-slot:footer="{ hide }">
        <b-button size="sm" @click="hide">Fermer</b-button>
      </template>
      <div class="px-3 py-2" >
        <p>
         <h5>Bienvenue sur l'application </h5><br>

       a remplir
      </div>
    </b-sidebar>

    
  

 
    
      </div>
   
</template>
<script>



export default {
  name: 'Welcome',

   data() {
      return {
        show: false
      }
    },

  components: {
    

  },

  async created() {
    await this.$store.dispatch('initTreatedParcels');
  },
}
</script>

<style scoped>



@media screen and (min-width: 900px) {
.global {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
   grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);}
 
#title {color:rgb(105, 103, 101);
  grid-column: 1/6;
  grid-row: 1 / 9;
}


#objective {
  grid-column: 3;
  grid-row: 2 / 5;
}

#btnGuide {
  grid-column: 3;
  grid-row: 5;
}}

#btnScenario { 
  width: auto;
  grid-column: 3 ;
  grid-row: 6;
}


</style>
