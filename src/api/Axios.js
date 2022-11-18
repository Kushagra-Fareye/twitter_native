import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://7acc-182-156-218-98.in.ngrok.io',
});
