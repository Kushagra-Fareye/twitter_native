import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

export const login = async data => {
  const xy = await Axios.post(
    `/login?username=${data.name}&password=${data.password}`,
    {
      withCredentials: true,
    },
  )
    .then(res => {
      return true;
    })
    .catch(error => console.log(error.response.request._response));

  if (!xy) return xy;
  const userData = await Axios.get(`/user/username/${data.name}`, {
    withCredentials: true,
  }).then(res => {
    return res.data;
  });
  const userBookmarks = await Axios.get(`/user/bookmark/${userData.userId}`, {
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
  const userLikes = await Axios.get(`/user/tweetLike/${userData.userId}`, {
    withCredentials: true,
  }).then(res => {
    return res.data;
  });
  const userFollowingIds = userFollowing.map(user => {
    return user.userId;
  });
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_FOLLOWINGS_IDS,
    JSON.stringify(userFollowingIds),
  );
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_LIKES,
    JSON.stringify(userLikes),
  );
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
  await AsyncStorage.setItem(
    AsyncStorageConstants.USER_BOOKMARKS,
    JSON.stringify(userBookmarks),
  );
  return xy;
};

export const signUp = async user => {
  const res = await Axios.post('/signup', user['user'])
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error.response.status;
    });
  const data = {name: user['user'].name, password: user['user'].password};
  if (typeof res === Object) {
    const x = await login(data);
    console.log(x, 'ctvbjnkmljihu76tfvuhijouy8tu7yftyhgjhiyutyrfdtghfgu');
  }
  return 200;
};

export const updateUser = async user => {
  console.log(user, 'update called calllllllllllllllllled');
  return Axios.put('/user', user)
    .then(res => {
      console.log(res, 'upppppppppppppppppppppppppdate');
      return res.data;
    })
    .catch(error => {
      return error.response.status;
    });
};
