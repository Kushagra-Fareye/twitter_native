import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const updateUserDetails = async user => {
  return Axios.put(`/user`, user)
    .then(res => {
      return res.data;
    })
    .catch(error => console.log(error.response.request._response));
};

export const getUserData = async userId => {
  let id = userId;
  if (!userId) {
    const {userId, token} = await getToken();
    id = userId;
  }
  return Axios.get(`/user/${id}`).then(res => {
    return res.data;
  });
};

export const getUserTweets = async userId => {
  let id = userId;
  if (!userId) {
    const {userId, token} = await getToken();
    id = userId;
  }

  return Axios.get(`/user/${id}/tweets`).then(res => {
    return res.data;
  });
};

export const getUserList = async ({type, userId}) => {
  console.log(`/user/${userId}/${type}`, 'api call');
  return Axios.get(`/user/${userId}/${type}`).then(res => {
    return res.data;
  });
};

export const logout = async() => {
  console.log('logout requested');
  await Axios.get(`/logout`).then(res => {
    return res.data;
  });
  console.log('logout requested');
  await AsyncStorage.setItem(AsyncStorageConstants.USER_DETAILS, '');
  await AsyncStorage.setItem(AsyncStorageConstants.USER_ID, '');
};

export const followUser = async followingId => {
  let {userId, token} = await getToken();
  await Axios.post(`/user/following/${userId}/${followingId}`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in followUser'));
};

export const unfollowUser = async followingId => {
  let {userId, token} = await getToken();
  await Axios.delete(`/user/following/${userId}/${followingId}`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e));
};

export const ApplyBluetick = async data => {
  let {userId} = await getToken();
  return Axios.put(`/user/bluetick/${userId}`)
    .then(res => {
      Alert.alert('Successfully apply for blue tick');
      return res.data;
    })
    .catch(e => console.log('Apply blue tick error', e));
};

export const fetchTrendingUser = async () => {
  return Axios.get(`/user/trending`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in trending'));
};
