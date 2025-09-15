import axios from 'axios';
import store from './store';

// axios.defaults.baseURL = 'http://business.amidev.bi/api/';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
// axios.defaults.baseURL = 'http://192.168.1.98:8000/api/';

axios.interceptors.request.use(
  (config) => {

    // if(!navigator.onLine) {
    //   store.state.notification = {
    //     type: 'error',
    //     message: "Vous n'êtes pas connecté."
    //   }
    //   return Promise.reject(new Error('You are offline.'));
    // }

    // const access = store.getters['access'];

    // store.state.errors = []

    // store.state.loading = true
    // access && (config.headers.Authorization = `Bearer ${access}`)

    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);
axios.interceptors.response.use(
  (response) => {
    store.state.loading = false
    return response
  },
  (error) => {
    store.state.loading = false
    return Promise.reject(error)
  }
);
export default axios;