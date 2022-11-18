import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const getUserNotifications = async data => {
  const {userId = 8, token} = await getToken();

  return Axios.get(`user/notification/${userId}`).then(res => {
    return res.data;
  }).catch(e => console.log(e, 'error in getUserNotifications'));;
};
