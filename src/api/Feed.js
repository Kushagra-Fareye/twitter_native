import {SortTypes} from '../constants/Feed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

async function getToken() {
  const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
  const token = await AsyncStorage.getItem(AsyncStorageConstants.TOKEN);
  return {userId, token};
}

export const getUserFeed = async data => {
  const {userId, token} = getToken();
  return new Promise(resolve =>
    setTimeout(resolve, 5000, [
      {id: 1, text: 'something is here'},
      {id: 2, text: 'something is here1'},
      {id: 3, text: 'something is here2'},
    ]),
  );
};

export const getSortedFeed = async ({param}) => {
  const {userId, token} = getToken();

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
  );
};

export const getUserBookmarkedFeed = async data => {
  const {userId, token} = getToken();

  return new Promise(resolve =>
    setTimeout(resolve, 5000, [
      {id: 1, text: 'something is here'},
      {id: 2, text: 'something is here1'},
      {id: 3, text: 'something is here2'},
    ]),
  );
};
