import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://794b-182-156-218-98.in.ngrok.io',
 //baseURL:'http://localhost:10.0.2.2/'
});
