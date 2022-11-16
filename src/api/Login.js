import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

export const login = async data => {
  console.log(data.name, data.password);
  const xy = await Axios.post(
    `/login?username=${data.name}&password=${data.password}`,
    {
      withCredentials: true,
    },
  )
    .then(res => {
      return true;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
  if (!xy) return xy;
  const userData = await Axios.get(`/user/username/${data.name}`, {
    withCredentials: true,
  }).then(res => {
    return res.data;
  });
  const userFollowers = await Axios.get(`/user/${userData.userId}/followers`, {
    withCredentials: true,
  }).then(res => {
    return res.data;
  });
  const userFollowing = await Axios.get(`/user/${userData.userId}/followings`, {
    withCredentials: true,
  }).then(res => {
    return res.data;
  });
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_ID,
    userData.userId.toString(),
  );
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_DETAILS,
    JSON.stringify(userData),
  );
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_FOLLOWERS,
    JSON.stringify(userFollowers),
  );
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_FOLLOWINGS,
    JSON.stringify(userFollowing),
  );
  return xy;
};

export const signUp = async user => {
  return Axios.post('/signup', user['user'])
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error.response.status;
    });
};
