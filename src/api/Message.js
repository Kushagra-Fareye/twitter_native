import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const getAllUserMessages = async data => {
  const {userId, token} = await getToken();
  return Axios.get(`/user/message/${userId}`).then(res=>{
   
    return res.data;
  }).catch((error) => console.log( error.response.request._response ) );;

  return Axios.pod
};

export const getSingleChatMessages = async (data) => {
  const {userId, token} = await getToken();
  
  // recieverId: data.recieverId
 return Axios.get(`/user/message/${userId}/${data}`).then(res=>{
    return res.data;
  }).catch((error) => console.log( error.response.request._response ) );;
};

export const postMessage = async data => {
  const {userId, token} = await getToken();
  console.log(data, 'blah blha')
const messageDto = {
  text:data.text,
  senderId: parseInt(userId),
  recieverId:parseInt(data.recieverId),
}
console.log(messageDto,'njkm')
  return Axios.post(`/user/message`,messageDto).then(res=>{
    console.log(res.data, 'blah blah blah');
    return res.data;

  }).catch((error) => console.log( error.response.request._response ) );;
};
  // new Promise(resolve => setTimeout(resolve, 5000, true));
