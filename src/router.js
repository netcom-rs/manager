import { createRouter, createWebHistory } from 'vue-router';                 
import HomePage from './components/Home.vue';
import Login from './components/Login.vue';
//import LoginView from './components/LoginView.vue';
import SubscriberList from './components/SubscriberList.vue';  
import SubscriberDetails from './components/SubscriberDetails.vue';
import RadiusStats from './components/SubscriberRejects.vue';
import SubscriberForm from './components/SubscriberForm.vue';
import SubscriberLogs from './components/Logs.vue';
import api from './api';
                                                                             
const routes = [                                                             
  {                                                                          
    path: '/',                                                               
    name: 'Home',                                                            
    component: HomePage,
    meta: {                                                                  
      requiresAuth: true,                                                    
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    beforeEnter(to, from, next) {
      localStorage.removeItem('token');
      next('/login');
    },
    name: 'Logout',
  },
  {                                                                          
    path: '/subscribers',                                                    
    name: 'SubscriberList',                                                  
    component: SubscriberList,
    meta: {                                                                  
      requiresAuth: true,                                                    
    },
  },
  {
     path: '/subscribers/:id',
     name: 'SubscriberDetails',
     component: SubscriberDetails,
      meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/add',
    name: 'SubscriberForm',
    component: SubscriberForm,
      meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/stats',
    name: 'Statistics',
    component: RadiusStats,
      meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/logs',
    name: 'SubscriberLogs',
    component: SubscriberLogs,
      meta: {
        requiresAuth: true,
      },
  }
];                                                                           
                                                                             
const router = createRouter({
  history: createWebHistory('/manager/'),
  base: process.env.BASE_URL,
  routes,                                                                    
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated && isAuthenticated === null) {
      // Redirect to login page if not authenticated
      next('/login');
    } else {
      // Validate the token here
      api.post('/check_token', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }).then((response) => {
        response = response.data;
        if(response.message === 'success' ) {
          next();
        } else {
          next('/login');
        }
      }).catch((error) => {
        next('/login');
        return error.response;
      });
      }
  } else {
    // If the route doesn't require authentication, proceed as usual
    next();
  }
});

export default router;