import axios from 'axios';
//import axios from 'axios';


export const api = axios.create({
  baseURL: `http://localhost:8080/`,
  headers: {
    Authorization: `Bearer {token}`
  }
})