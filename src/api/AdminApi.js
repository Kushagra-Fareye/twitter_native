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
  })
  .catch(e => console.log(e, 'error in getAllUsers'));
};

export const getAllBlueTickRequests = async () => {
  const {userId, token} = await getToken();
  return Axios.get('/user/bluetick')
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'there is error in getAllBluetickRequests'));
};

export const acceptBlueTickRequests = async data => {
  const {userId} = data;
  return Axios.put(
    `bluetick/status/${userId}`,
    {data},
    {
      auth: {
        username: 'foo',
        password: 'bar',
      },
    },
  ).then(res => {
    console.log(res);
    return res.data;
  }).catch(e => console.log(e, 'there is error in acceptBlueTickRequests'));;
};

export const rejectBlueTickRequests = async data => {
  const {userId, token} = await getToken();

  return new Promise(resolve => setTimeout(resolve, 5000, false))
  .catch(e => console.log(e, 'there is error in rejectBlueTickRequests'));;
};

export const deleteUser = async data => {
  const {userId, token} = await getToken();
  // return Axios.delete(`/user/${userId}`,
  // {data},
  // ).then(res => {
  //   return res.data;
  // })

  // return new Promise(resolve => setTimeout(resolve, 5000, false));
};
