import {SortTypes} from '../constants/Feed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import Axios from './Axios';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const getUserFeed = async data => {
  const {userId, token} = await getToken();
  return Axios.get(`/user/${userId}/feeds`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in getUserFeed'));
};

export const getSortedFeed = async ({param}) => {
  const {userId, token} = await getToken();

  if (param === SortTypes.DATE) {
    const feed = await getUserFeed(userId);
    let updatedFeed = feed.sort((a, b) => {
      a.createdAt > b.createdAt;
    });
    return updatedFeed;
  }
  return new Promise(resolve =>
    setTimeout(resolve, 100, [
      {id: 1, text: 'something is here12'},
      {id: 3, text: 's2356432'},
      {id: 2, text: 'somethi24354236273463g is here2'},
    ]),
  ).catch(e => console.log(e, 'error in getSortedFeed'));
};

export const getUserBookmarkedFeed = async data => {
  const {userId, token} = await getToken();

  return Axios.get(`/user/bookmark/${userId}`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in getUserBookmarkedFeed'));
};
