<template>                                                                   
    <nav v-if="!isMobile()" class="navigation">                                                   
      <div class="navigation__logo">                                           
        <img src="../assets/logo.png" alt="Logo" class="navigation__logo-image">                                              
      </div>                                                                   
      <ul class="navigation__list">                                            
        <li class="navigation__item">                                          
          <router-link to="/" class="navigation__link">Home</router-link>      
        </li>                                                                  
        <li class="navigation__item">                                          
          <router-link to="/subscribers" class="navigation__link">Subscribers</router-link>                                                           
        </li>
        <li class="navigation__item">
          <router-link to="/add" class="navigation__link">Add Subscriber</router-link>
        </li>
        <li class="navigation__item">
          <router-link to="/stats" class="navigation__link">Statistics</router-link>
        </li>
        <li class="navigation__item">
          <router-link to="/logs" class="navigation__link">Logs</router-link>
        </li>
        <li class="navigation__item" v-if="!isLoggedIn">                                          
          <router-link to="/login" class="navigation__link">Login</router-link>
        </li>
        <li class="navigation__item" v-if="isLoggedIn">                                          
          <router-link to="/logout" class="navigation__link" @click="logout">Logout</router-link>
        </li>
      </ul>                                                                    
    </nav>
    <nav v-else class="navigation_mobile">                                                   
      <div class="navigation__logo_mobile">                                           
        <img src="../assets/logo.png" alt="Logo" class="navigation__logo-image_mobile">                                              
      </div>                                                                   
      <ul class="navigation__list_mobile">                                            
        <li class="navigation__item_mobile">                                          
          <router-link to="/" class="navigation__link_mobile">Home</router-link>      
        </li>                                                                  
        <li class="navigation__item_mobile">                                          
          <router-link to="/subscribers" class="navigation__link_mobile">Subscribers</router-link>                                                           
        </li>
        <li class="navigation__item_mobile">
          <router-link to="/add" class="navigation__link_mobile">Add Subscriber</router-link>
        </li>
        <li class="navigation__item_mobile">
          <router-link to="/stats" class="navigation__link_mobile">Statistics</router-link>
        </li>
        <li class="navigation__item_mobile">
          <router-link to="/logs" class="navigation__link_mobile">Logs</router-link>
        </li>
        <li class="navigation__item_mobile" v-if="!isLoggedIn">                                          
          <router-link to="/login" class="navigation__link_mobile">Login</router-link>
        </li>
        <li class="navigation__item_mobile" v-if="isLoggedIn">                                          
          <router-link to="/logout" class="navigation__link_mobile" @click="logout">Logout</router-link>
        </li>
      </ul>                                                                    
    </nav>
</template>

  <script>                                                                     
  export default {                                                             
    name: 'AppNavigation',
    data() {                                                                                                                                          
      return {
        isLoggedIn: false,
      };                                                                                                                                              
    },
    created() {                                                                                                                                      
      const accessToken = localStorage.getItem('token');
      this.isLoggedIn = !!accessToken; // Update the isLoggedIn state based on the presence of the access token                                                                                              
    },
    methods: {   
      isMobile() {

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      },                                                                                                                                     
      logout() {
            // Clear the user's session or access token from client-side storage                                                                      
            localStorage.removeItem('token');

            // Update the app's state to reflect that the user is logged out                                                                          
            //this.$store.commit('setLoggedIn', false);

            // Redirect the user to the login page or any other appropriate page                                                                      
            this.$router.push('/login');                                                                                                                                       
      }                                                                                                                                               
    }
  };                                                                           
  </script>                                                                    
                                                                               
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;1,100&display=swap');
.navigation_mobile {
  position: fixed;                                                           
  top: 0;                                                                    
  left: 0;                                                                
  width: 100%;                                                               
  background-color: #000000;                                                    
  padding: 10px;                                                             
  display: flex;                                                             
  justify-content: space-between;                                            
  align-items: center;                                                       
  z-index: 999;
}
.navigation__logo_mobile {                                                          
  margin-right: 20px;                                                        
}                                                                            
                                                                             
.navigation__logo-image_mobile {                                                    
  width: 20px;                                                               
  height: 20px;                                                              
}                                                                            
                                                                             
.navigation__list_mobile {                                                          
  list-style-type: none;                                                     
  padding: 0;                                                                
  margin: 0;                                                                 
  display: flex;                                                             
}                                                                            
                                                                             
.navigation__item_mobile {                                                          
  margin-right: 20px;                                                        
}                                                                            
                                                                             
.navigation__link_mobile {  
  /* change font to Lato */
  font-family: 'Lato', sans-serif;
  text-decoration: none;                                                     
  color: #fff;                                                               
  font-size: 8px;                                                           
  /*font-weight: bold; */
  padding: 4px;                                                             
  transition: color 0.3s ease-in-out;                                        
}                                                                            
                                                                             
.navigation__link_mobile:hover {                                                    
  color: #42f86f;                                                            
}
.navigation {                                                                
  position: fixed;                                                           
  top: 0;                                                                    
  left: 0;                                                                   
  width: 100%;                                                               
  background-color: #000000;                                                    
  padding: 15px;                                                             
  display: flex;                                                             
  justify-content: space-between;                                            
  align-items: center;                                                       
  z-index: 999;                                                              
}                                                                            
                                                                             
.navigation__logo {                                                          
  margin-right: 20px;                                                        
}                                                                            
                                                                             
.navigation__logo-image {                                                    
  width: 20px;                                                               
  height: 20px;                                                              
}                                                                            
                                                                             
.navigation__list {                                                          
  list-style-type: none;                                                     
  padding: 0;                                                                
  margin: 0;                                                                 
  display: flex;                                                             
}                                                                            
                                                                             
.navigation__item {                                                          
  margin-right: 20px;                                                        
}                                                                            
                                                                             
.navigation__link {  
  /* change font to Lato */
  font-family: 'Lato', sans-serif;
  text-decoration: none;                                                     
  color: #fff;                                                               
  font-size: 16px;                                                           
  /*font-weight: bold; */
  padding: 10px;                                                             
  transition: color 0.3s ease-in-out;                                        
}                                                                            
                                                                             
.navigation__link:hover {                                                    
  color: #42f86f;                                                            
}                                                                            
</style>