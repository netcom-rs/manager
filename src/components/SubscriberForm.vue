<template>
    <div class="col-md-12">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <Form @submit="submitForm" :validation-schema="schema">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" v-model="form.username" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" v-model="form.password" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="vlan">VLAN</label>
            <Field name="vlan" type="text" class="form-control" v-model="form.vlan" />
            <ErrorMessage name="vlan" class="error-feedback" />
          </div>
          <div class="form-group">
              <label for="mac">MAC</label>
              <Field name="mac" type="text" class="form-control" v-model="form.mac" />
              <ErrorMessage name="mac" class="error-feedback" />
          </div>

          <div>
            <br>
            </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block form-control" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Send</span>
            </button>
          </div>
            <div>
                <br>
            </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
          </div>
          </div>
          <div class="form-group">
            <div v-if="messageSuccess" class="alert alert-success" role="alert">
              {{ messageSuccess }}
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
  name: 'SubscriberForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {  
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
      //vlan: yup.string().required("VLAN is required!"),
      //mac: yup.string().required("MAC is required!"),
    });
    return {   
        loading: false,                                                              
        form: {                                                                
          name: '',                                                            
          username: '',
          password: null,
          vlan: '',
          mac: '',
          schema,
        },
        size: 10,
        message: '',
        messageSuccess: '',
    };                                                                       
  },
  async mounted() {
    this.form.password = this.password_gen();
    this.form.vlan = this.get_next_vlan();
},
  methods: {
    async get_next_vlan() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
      try {
        await api.get('/users/vlan', {
          headers
        })
        .then((response) => this.form.vlan = response.data.next_vlan)
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async submitForm() {                                                           
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        };
        this.loading = true;
        try {
            const post = await api.post('/users/create', {
                  //name: this.form.name,
                  username: this.form.username,
                  password: this.form.password,
                  vlan: this.form.vlan,
                  mac: this.form.mac,
              }, {
                headers
            });
            const response = post.data;
            if(response != null && response.message === 'success'){
                this.loading = false;
                this.message = '';
                this.messageSuccess = response.message;
                this.form.username = '';
                this.form.password = this.password_gen();
                this.form.vlan = '';
                this.form.mac = '';
                this.$router.push('/add');
            } else {
                this.loading = false;
                this.messageSuccess = '';
                throw new Error(response.message);
            }
        } catch (error) {
            this.loading = false;
            this.messageSuccess = '';
            this.message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            console.error('Registration failed:', error);                                                                                                      
      }
    },
    password_gen() {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_-+=<>?/[]{|}';

        let password = '';

        // Ensure at least one character from each category
        password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
        password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
        password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

        // Fill the rest of the password with random characters from all categories
        const remainingChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
        for (let i = 4; i < this.size; i++) {
            password += remainingChars.charAt(Math.floor(Math.random() * remainingChars.length));
        }

        // Shuffle the password characters to randomize the order
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        //this.form.password = password;
        return password;
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