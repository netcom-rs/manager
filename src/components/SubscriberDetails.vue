<template>                                                                   
    <div>                                                                      
      <h2>Subscriber Details</h2>                                              
      <div>                                                                    
        <strong>Name:</strong> {{ subscriber.name }}                           
      </div>                                                                   
      <div>                                                                    
        <strong>Username:</strong> {{ subscriber.username }}                   
      </div>                                                                   
      <button @click="goBack">Go Back</button>                                 
    </div>                                                                     
  </template>                                                                  
                                                                               
  <script>                                                                     
  export default {                                                             
    name: 'SubscriberDetails',                                                 
    props: {                                                                   
      subscriber: {                                                            
        type: Object,                                                          
        required: true,                                                        
      },                                                                       
    },                                                                         
    methods: {                                                                 
      goBack() {                                                               
        // Logic to navigate back to the previous page                         
      },                                                                       
    },                                                                         
  };                                                                           
  </script>