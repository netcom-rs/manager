<template>
    <div class="grid-container">
        <div id="chart">
            <Doughnut id="my-chart-id" :options="chartOptions" v-if="loaded" :data="chartData" />
        </div>
        <div id="divider-vertical"></div>
        <div id="chart1">
            <Bar id="my-chart-id1" :options="chartOptions" v-if="loaded" :data="chartData1" />
        </div>
        <div id="divider-horizontal"></div>
    </div>
</template>
                                                                               
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js'
//import { Line } from 'vue-chartjs'
import api from '../api';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title,)

export default {                                                             
  name: 'CountPage',                                                              
  components: {
    Doughnut,
    //Line,
    Bar,
  },
  data () {
    return {
      loaded: false,
      chartData: null,
      chartData1: null,
      data: {},
      data1: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  async mounted() {
    this.api();
  },
  methods: {
    async api () {
      //this.loaded = false
    
      try {
        const response = await api.get('https://fr-api.netcoms.rs/api/v1/auth/count', {                 
             headers: {                       
               'Content-Type': 'application/json',                                    
               'Authorization': `Bearer ${localStorage.getItem('token')}`,                            
             }, 
        });
        const response1 = await api.get('https://fr-api.netcoms.rs/api/v1/auth/data', {                 
             headers: {                       
               'Content-Type': 'application/json',                                    
               'Authorization': `Bearer ${localStorage.getItem('token')}`,                            
             }, 
        });
        if (response) {
            this.data = response.data;
        }
        if (response1) {
            this.data1 = response1.data;
            console.log(this.data1);
        } else {
            this.data1 = 10;
        }
        this.chartData = {
          labels: ['Accept', 'Reject'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651'],
              data: this.data
            }
          ]
        };
        this.chartData1 = {
          labels: ['Devices', 'Users'],
          datasets: [
            {
              label: 'Online',
              backgroundColor: ['#41B883'],
              data: [this.data1['online_users'], this.data1['all_users']]
            }
          ]
        };
        this.loaded = true;
        } catch (e) {
        console.error(e);
        }

  }
},
};
</script>
<style scoped>
#chart {
  width: 100%;
  height: 100%;
  margin: 0 left;
  float: left;
}
#chart1 {
  width: 100%;
  height: 100%;
  margin: 0 right;
  float: right;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1px 1fr; /* Two columns with a 1px vertical divider in the middle */
  grid-template-rows: 1fr 1px 1fr; /* Two rows with a 1px horizontal divider in the middle */
  width: 100%;
  height: 100%; /* Adjust the height as needed */
}
/**
#chart, #chart1 {
  width: 100%;
  height: 100%;
  margin: 0 center;
  float: left;
}
*/
#divider-vertical {
  background-color: #000;
  grid-row: 1 / span 3;
  grid-column: 2;
  height: 100%;
}

#divider-horizontal {
  background-color: #000;
  grid-row: 2;
  grid-column: 1 / span 3;
  width: 100%;
}

</style>