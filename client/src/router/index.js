import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '../components/Welcome';
import Morpho from '../components/morphoFeatures_components/MorphoFeatures';
import ScenarioSetter from '../components/scenarioSetter_components/ScenarioSetter';
import PulveRecommendation from '../components/pulveRecommendation_components/PulveRecommendation';



Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },


    {
      path: '/scenario',
      name: 'scenario',
      component: ScenarioSetter
    },

    {
      path: '/morpho',
      name: 'morpho',
      component: Morpho
    }, 

    {
      path: '/pulve',
      name: 'pulve',
      component: PulveRecommendation
    }, 

    




    

    

  ]
})
