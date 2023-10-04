<template>
    <div id="chart">
      <Bar id="my-chart-id" :options="chartOptions" v-if="loaded" :data="chartData" />
    </div>
    <div id="chart1">
      <Bar id="my-chart-id1" :options="chartOptions" v-if="loaded" :data="chartData1" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'RadiusStats',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
    chartData1: null,
    data: {},
    data1: {},
    chartOptions: {
      responsive: true
    },
    timer: null
  }),
  async mounted () {
    this.api();
    this.timer = setInterval(this.api, 5000);
  },
  methods: {
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    beforeDestroy() {
      this.cancelAutoUpdate();
    },
    async api () {
      //this.loaded = false
    
      try {
        await fetch('https://fr-api.netcoms.rs/api/v1/auth/rejects', {
          method: 'GET',                     
             headers: {                       
               'Content-Type': 'application/json',                                    
               'Authorization': `Bearer ${localStorage.getItem('token')}`,                            
             }, 
        })
        .then(response => response.json())
        .then(data => {
          this.data = data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        await fetch('https://fr-api.netcoms.rs/api/v1/auth/accepts', {
          method: 'GET',                     
             headers: {                       
               'Content-Type': 'application/json',                                    
               'Authorization': `Bearer ${localStorage.getItem('token')}`,                            
             }, 
        })
        .then(response => response.json())
        .then(data => {
          this.data1 = data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        this.chartData = {
          labels: this.data['authdate'],
          datasets: [
            {
              label: 'Access-Reject',
              backgroundColor: '#f87979',
              data: this.data['users']
            }
          ]
        }

        this.chartData1 = {
          labels: this.data1['authdate'],
          datasets: [
            {
              label: 'Access-Accept',
              backgroundColor: '#f87979',
              data: this.data1['users']
            }
          ]
        }

        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style scoped>
#chart {
  width: 50%;
  height: 100%;
  margin: 0 left;
  float: left;
}
#chart1 {
  width: 50%;
  height: 100%;
  margin: 0 right;
  /** make it to be on the right side of #chart */
  float: right;

}
</style>