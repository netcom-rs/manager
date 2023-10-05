<template>
    <div id="search">
      <vue-good-table
        :columns="columns"
        :rows="filteredUsers"
        :search-options="{ enabled: true, placeholder: 'Search Users' }"
        :paginate="true"
        :pagination-options="{ enabled: true, perPage: 10 }"
        :lineNumbers="true"
        @change="changeCell">
        <template #table-row="props">
        <span v-if="props.column.field == 'edit'">
          <button type="button" class="btn btn-warning" v-on:click="edit(props.row.id)">
            <i class="fas fa-edit"></i>
          </button>
        </span>
        <span v-else-if="props.column.field == 'remove'">
          <button type="button" class="btn btn-danger" v-on:click="removeUser(props.row)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </span>
        <span v-else>
          <span v-if="props.column.field == 'username' && props.row.isEditable">
            <input v-model="props.row[props.column.field]" @change="saveChanges(props.row)"/>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </span>
      </template>
    </vue-good-table>
    </div>
</template>
  
<script>
//<input v-model="props.row[props.column.field]" @input="editCell(props.row, props.column.field)" />
import api from '../api';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'

export default {
  name: 'SubscriberList',
  data() {
    return {
      users: [],
      search: '',
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Username', field: 'username' },
        { label: 'MAC', field: 'mac' },
        { label: 'VLAN-ID', field: 'value' },
        { label: 'Edit', field: 'edit' },
        { label: 'Remove', field: 'remove' }
      ],
      mediaPlanData: [],
      dot: null,
    };
  },
  methods: {
    startEditing(props) {
      // Enable editing for clicked row
      this.$set(props.row, 'editing', true);
      console.log(`Editing user with ID ${props.row.id}`);
      console.log(props.row);
    },
    //editCell(user, field) {
    //  // Save the edited data to your API or perform other actions
    //  // For example, you can make an API call to update the user data
    //  console.log(`Edited ${field} for user ID: ${user.id} to ${user[field]}`);
    //},
    edit(id) {
      const userToEdit = this.users.find(user => user.id === id);
      if (userToEdit) {
        userToEdit.isEditable = true;
        this.dot = userToEdit;
      }
    },
    //changeCell(changedData, column, row) {
    changeCell() {
            console.log('changedData');
            const userToEdit = this.dot;
            if (userToEdit) {
              userToEdit.isEditable = false;
            }
    },
    async saveChanges(user) {
      try {
        // Make an API call to update the user data
        await api.put(`/users/${user.username}`, user);
        user.editing = false; // Disable editing after successful API call
        console.log(`User with ID ${user.id} updated successfully!`);
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error scenarios, show error messages, etc.
      }
    },
    async removeUser(user) {
      try {
        const index = user.originalIndex;
        // Make an API call to remove the user
        const response = await api.delete(`/users/${user.username}/delete`, { headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }});
        const message = response.data.message;
        if (message === 'success') {
          console.log('success: ' + message);
          //this.$delete(user, 'editing'); // Remove the editing property from the user object
          // Remove the user from the local data
          if (index !== -1) {
            this.users.splice(index, 1);
          }
          console.log(`User with ID ${user.id} removed successfully!`);
        } else {
          //raise error
          throw new Error(message);
        }
      } catch (error) {
        console.error('Error removing user:', error);
        // Handle error scenarios, show error messages, etc.
      }
    },
    },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.username.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  components: {
    VueGoodTable,
  },
  async mounted() {
    // Fetch data from your API endpoint using Axios
    api.get('/users/list', {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
      }
    })
      .then(response => {
        this.users = response.data;
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
