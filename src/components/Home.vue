<template>                                                                   
    <div>                                                                      
      <h1>Monitoring Data Overview</h1>
      <p>Last hour</p>
    </div>
    <div id="chart">
    <CountPage/>
    </div>
</template>
                                                                               
<script>
import CountPage from './Count.vue';

export default {                                                             
  name: 'HomePage',                                                              
  components: {
    CountPage,
  },
  data () {
  },
};
</script>