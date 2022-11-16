import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const getAllUsers = async () => {
  const {userId, token} = await getToken();

  return Axios.get('/user').then(res => {
    return res.data;
  });
};

export const getAllBlueTickRequests = async () => {
  const {userId, token} = await getToken();
  return Axios.get('/user/admin/bluetick')
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'there is error in this request'));
};

export const blueTickResponse = async (data,status) => {
  const {userId} = data;
  
  console.log(`user/admin/bluetick/status/${userId}/${status}`);
  return Axios.put(
    `user/admin/bluetick/status/${userId}/${status}`,   
  ).then(res => {
    console.log(res.data);
    return res.data;
  }).catch(e =>console.log("error",e));
};


export const deleteUser = async data => {
  const {userId, token} = await getToken();
  return Axios.delete(`/user/${userId}`,
  ).then(res => {
    console.log(res.data);
    return res.data;
  }).catch( err =>console.log('Delete user api error',err));
};
