<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="login" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" v-model="username" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" v-model="password" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <label for="btn-login"></label>
          <button class="btn btn-primary btn-block form-control" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>                                                                                                                                            
import api from '../api';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
                                                                                                                                                    
export default {
  name: 'LoginPage',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: '',
      username: '',
      password: '',
      schema,
    };                                                                                                                                              
  },                                                                                                                                                
  methods: {                                                                                                                                        
    async login() {
      this.loading = true;
      try {                                                                                                                                         
        const response = await api.post('/login', {                                                                                                 
          username: this.username,
          password: this.password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const token = response.data.access_token;
        if (token != null) {
          // Save token to local storage                                                                                                              
          localStorage.setItem('token', token);                                                                                                       
                                                                                                                                                    
          // Redirect to home page                                                                                                                    
          this.$router.push('/');
        } else {
          console.log(token)
          this.loading = false;
          this.message = 'Login failed!';
        }
      } catch (error) {
        this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        console.error('Login failed:', error);                                                                                                      
      }                                                                                                                                             
    },                                                                                                                                              
  },                                                                                                                                                
};                                                                                                                                                  
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>