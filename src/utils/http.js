import axios from 'axios';

// https://us-central1-buy-my-sticks.cloudfunctions.net/

const isProd = process.env.NODE_ENV == 'production';

const axiosInstance = axios.create({
  baseURL: isProd ? 'https://us-central1-buy-my-sticks.cloudfunctions.net/'
                  : 'http://localhost:5000/buy-my-sticks/us-central1/',
});

export default axiosInstance;