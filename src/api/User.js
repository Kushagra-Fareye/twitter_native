import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const updateUserDetails = async user => {
  const {userId, token} = await getToken();
  console.log(user)
  return Axios.post(`/user`, user).then(res => {
    return res.data;
  }).catch((error) => console.log( error.response.request._response ) );
};