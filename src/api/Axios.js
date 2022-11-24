import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://4b73-182-156-218-98.in.ngrok.io/',
});
