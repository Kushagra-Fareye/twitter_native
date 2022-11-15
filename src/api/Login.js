import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

export const login = async data => {
  console.log(data);
  const xy = await Axios.post(`/login?username=foo&password=bar`)
    .then(res => {
      console.log(res.data);
    })
    .catch(e => console.log(e));

  await AsyncStorage.setItem(AsyncStorageConstants.USER_ID, '13');
  await AsyncStorage.setItem(
    AsyncStorageConstants.TOKEN,
    'JSESSIONID=F3002E8F28A3B75976111B62942D08F6',
  );
  await AsyncStorage.setItem(AsyncStorageConstants.USER_DETAILS, 'userObject');
  return new Promise(resolve => setTimeout(resolve, 100, false));
};

export const signUp = async user => {
  let usertemp = {
    dob: '2020-11-15T05:05:39.061Z',
    name: 'kada',
    password: 'kada',
    userName: 'Kada',
  };

  Axios.post('/user', user['user'])
    .then(res => console.log('ssssssss', res.data))
    .catch(error => console.log(error.response.request._response));
  return new Promise(resolve => setTimeout(resolve, 100, true));
};
