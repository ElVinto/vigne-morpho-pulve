<template>
  <div
    class="global"
    style="background-image:url(images/AniceCheraiet-MasPiquet-LIDAR_c_INRAE-CaroleGiansily-4032x3024px.jpg); background-size: 2200px 800px;padding:30px;margin: 1px;height: 800px">
 
  <div id="title">
    <h1>Vigne morpho pulve</h1>
  </div>
     
    
<hr>
	
	<div id="objective" class="card bg-dark text-white" style="opacity:90%">
      
      <div class="card-body" >
        <p>
        <center><b >
          Déterminer la juste dose de phytosanitaire à appliquer en fonction du stade de végétation de la vigne et du pulvérisateur utilisé
          </b></center>
        </p>
        <p > 
          En fonction du type de pulvérisateur, du stade phénologique de la vigne, de la canopée, l’application détermine la juste dose de produit phytosanitaire à appliquer et la compare avec la dose maximale proposée par défaut. 
          Les données d’entrées sont la parcelle, le cépage, le stade phénologique, l’applicateur utilisé.
        </p>
        <p>Développeur(s) : Vincent Armant et Amin Ouail | Doctorant : Anice Cheraiet, ITAP, INRAE</p>
      </div>
    </div>
    


    <div id="btnScenario" style="width: auto; opacity:90%;">
    <b-button to="/scenario" variant="dark" style="width: auto;"><img src="images/scenario.png"/><br><b>Sélectionner un scénario</b></b-button>     
    </div>


  <!--
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

      </div>
    </b-sidebar>
  -->
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


.card-body {  
  overflow-y: scroll; 
  width: 100%; 
  text-align: justify; 
  margin-top: 0px;
  font-size: small;
  }


@media screen and (min-width: 900px) {
.global {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
   grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);}
 
#title {color:rgb(105, 103, 101);
  grid-column: 1/6;
  grid-row: 1;
}

#btnScenario { 
  width: auto;
  grid-column: 3 ;
  grid-row: 2;
}

#objective {
  grid-column: 2/5;
  grid-row: 5/6;
}

#btnGuide {
  grid-column: 3;
  grid-row: 5;
}}




</style>
