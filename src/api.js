import axios from 'axios';                                                                                                                          
                                                                                                                                                       
const api = axios.create({                                                                                                                          
  baseURL: 'https://fr-api.netcoms.rs/api/v1',
//  headers: {
//    'Content-Type': 'application/json',
//    'Authorization': 'Bearer ' + localStorage.getItem('token'),
//  },
});                                                                                                                                                 
                                                                                                                                                    
export default api;