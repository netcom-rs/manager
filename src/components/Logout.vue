<template>                                                                                                                                          
    <div>                                                                                                                                             
      <!-- Your app's content here -->                                                                                                                
                                                                                                                                                      
      <button @click="logout">Logout</button>                                                                                                         
    </div>                                                                                                                                            
  </template>                                                                                                                                         
                                                                                                                                                      
  <script>                                                                                                                                            
  export default {
    name: 'LogoutPage',
    methods: {                                                                                                                                        
      logout() {                                                                                                                                      
        // Make a request to the external API to logout                                                                                               
        // You can use Axios or any other HTTP library for this                                                                                       
        axios.post('/logout')                                                                                                                         
          .then(() => {                                                                                                                               
            // Clear the user's session or access token from client-side storage                                                                      
            localStorage.removeItem('accessToken');                                                                                                   
                                                                                                                                                      
            // Update the app's state to reflect that the user is logged out                                                                          
            this.$store.commit('setLoggedIn', false);                                                                                                 
                                                                                                                                                      
            // Redirect the user to the login page or any other appropriate page                                                                      
            this.$router.push('/login');                                                                                                              
          })                                                                                                                                          
          .catch(error => {                                                                                                                           
            console.error('Logout failed:', error);                                                                                                   
          });                                                                                                                                         
      }                                                                                                                                               
    }                                                                                                                                                 
  }                                                                                                                                                   
  </script>