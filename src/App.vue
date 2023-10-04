<template>                                                                   
  <div id="app">                                                             
    <AppNavigation />                                                           
    <router-view />                                                          
  </div>                                                                     
</template>                                                                  
                                                                             
<script>                                                                     
import AppNavigation from './components/Navigation.vue';
                                                                             
export default {                                                             
  name: 'App',                                                               
  components: {                                                              
    AppNavigation,                                                              
  },                                                                         
};                                                                           
</script>                                                                    
                                                                             
<style>                                                                      
#app {                                                                       
  max-width: auto;                                                          
  margin: 0 0;                                                            
  padding: 30px;                                                             
}
</style>