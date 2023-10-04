<template>
    <div class="container">
      <form @submit.prevent="login">
        <h2 class="mb-3">Login</h2>
        <div class="input">
          <label for="username">Email address</label>
          <input
            class="form-control"
            type="text"
            name="username"
            placeholder="username"
            id="username"
          />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            class="form-control"
            type="password"
            name="password"
            placeholder="password123"
            id="password"
          />
        </div>
        <div class="alternative-option mt-4">
          You don't have an account? <span @click="moveToRegister">Register</span>
        </div>
        <button type="submit" class="mt-4 btn-pers" id="login_button">
          Login
        </button>

      </form>
    </div>
  </template>
  
<script>
import api from '../api';

export default {
    name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {                                                                                                                                 
    try {                                                                                                                                         
      const response = await api.post('/login', {                                                                                                 
        username: this.username,                                                                                                                  
        password: this.password,                                                                                                                  
      });                                                                                                                                         
      const token = response.data.access_token;                                                                                                          
                                                                                                                                                  
      // Save token to local storage                                                                                                              
      localStorage.setItem('token', token);                                                                                                       
                                                                                                                                                  
      // Redirect to home page                                                                                                                    
      this.$router.push('/');                                                                                                                     
    } catch (error) {                                                                                                                             
      console.error('Login failed:', error);                                                                                                      
    }                                                                                                                                             
  },
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

