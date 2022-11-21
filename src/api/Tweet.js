import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const likeTweet = async tweetId => {
  const {userId, token} = await getToken();
  return Axios.post(`/user/${userId}/tweets/${tweetId}`, {
    withCredentials: true,
  })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => console.log(e, 'error'));
};

export const removeLike = async tweetId => {
  const {userId, token} = await getToken();
  return Axios.delete(`/user/${userId}/tweets/${tweetId}`, {
    withCredentials: true,
  })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => console.log(e, 'error'));
};

export const getUserComment = async tweetId => {
  return Axios.get(`/user/tweets/${tweetId}/comments`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in getUserComment'));
};

export const postComment = async data => {
  console.log(data);
  return Axios.post(`/user/tweets/comments`, data)
    .then(res => {
      console.log(res.data, 'bhjnkm');
      return res.data;
    })
    .catch(error => console.log(error.response.request._response));
};

export const getTweetData = async tweetId => {
  const {userId, token} = await getToken();

  return Axios.get(`/user/tweets/${tweetId}`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in getTweetData'));
};

export const postRetweet = async tweetId => {
  const {userId, token} = await getToken();
  console.log(`/user/${userId}/retweets/${tweetId}`);
  return Axios.post(`/user/${userId}/retweets/${tweetId}`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in postRetweet'));
};

export const postTweet = async tweet => {
  console.log('aaaaaaaaa', tweet);

  return Axios.post(`/user/tweets`, tweet)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => console.log(error, 'error in post tweet'));
};

export const addBookmark = async tweetId => {
  const {userId, token} = await getToken();
  return Axios.post(`/user/bookmark`, {
    tweetId: tweetId,
    userId,
    userId,
  })
    .then(res => {
      return res.data;
    })
    .catch(error => console.log(error.response.request._response));
};

export const deleteBookmark = async tweetId => {
  const {userId, token} = await getToken();
  return Axios.delete(`/user/${userId}/bookmark/${tweetId}`)
    .then(res => {
      return res.data;
    })
    .catch(error => console.log(error.response.request._response));
};
