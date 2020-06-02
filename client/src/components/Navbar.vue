<template>
  <div class="topnav">
    <div >
      <router-link to="/" class="nav-link"> Home</router-link>
      <router-link to="/scenario" class="nav-link"> Scénarios</router-link>
      <router-link to="/morpho" class="nav-link"> Caractéristiques morphologiques</router-link>
      <router-link to="/pulve" class="nav-link"> Recommendations </router-link>
      
    </div>

   
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  
  async created () {



 },
  methods: {

    
  },
};
</script>

<style scoped>
 @media screen and (min-width: 900px) {
.topnav {overflow: hidden;background-color: #333; width: 100%;}
.topnav a {float: left;display: block;color: #f2f2f2;text-align: center;padding: 14px 16px;text-decoration: none;}
#exit{float: right}
.topnav a:hover {background-color:rgb(165, 161, 161);color: black;}}

@media screen and (max-width: 900px) {
.topnav a {float: none;width: 35%;}
.topnav {overflow: hidden;background-color: #333; width: 100%;}
.topnav a {float: left;display: block;color: #f2f2f2;text-align: center;padding: 5px 5px;text-decoration: none;}

.topnav a:hover {background-color:rgb(165, 161, 161);color: black;}}





</style>
