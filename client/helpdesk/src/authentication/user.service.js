import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:4000/";

//Used to send request based on user type.
class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAgentToConnect(userName){
    return axios.post(API_URL + "getAgent", {
            userName
          })
          .then(response => {        
            if (response.data.agent) {
              localStorage.setItem("agent", JSON.stringify(response.data.agent));
            }
            return response.data; 
          });
  }

  getCustomerList(agent){
    return axios.post(API_URL + "getCustomerList", {
            agent
          })
          .then(response => {
            const customers = response.data.customers;
           if (customers){
              for(var i = 0; i < customers.length; i++){
                sessionStorage.setItem(customers[i], "present");
              }
           }

            return response.data; 
          });
  }
  
}

export default new UserService();