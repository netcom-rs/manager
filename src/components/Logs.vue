<template>
    <div id="search">
      <vue-good-table
        :columns="columns"
        :rows="filteredUsers"
        :search-options="{ enabled: true, placeholder: 'Search Logs' }"
        :pagination-options="{ enabled: true, jumpFirstOrLast : true, perPage: 10, mode: 'pages', perPageDropdown: [10, 20, 30, 40, 50] }"
        :sort-options="{ enabled: true, initialSortBy: {field: 'formatted_authdate', type: 'desc'} }"
        :lineNumbers="true">
    </vue-good-table>
    </div>
</template>
  
<script>
import api from '../api';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'

export default {
  name: 'SubscriberLogs',
  data() {
    return {
      logs: [],
      search: '',
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Username', field: 'username' },
        { label: 'Password', field: 'pass' },
        { label: 'Reply', field: 'reply' },
        { label: 'Date', field: 'formatted_authdate'}
      ],
      dot: null,
    };
  },
  methods: {
    },
  computed: {
    filteredUsers() {
      return this.logs.filter(user => user.username.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  components: {
    VueGoodTable,
  },
  async mounted() {
    // Fetch data from your API endpoint using Axios
    api.get('/auth/logs', {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
      }
    })
      .then(response => {
        this.logs = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style scoped>
.search {
  width: 50%;
  height: 100%;
  margin: 0 left;
  float: left;
}
</style>
