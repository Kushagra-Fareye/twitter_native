import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {imageDefault} from '../assets/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import {followUser, unfollowUser} from '../api/User';

export default function UserCard(props) {
  const {data} = props;
  const [userFollowing, setUserFollowing] = useState([]);
  const [isFollowed, toggleIsFollowed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  async function onLoad() {
    const data1 = await AsyncStorage.getItem(
      AsyncStorageConstants.USER_FOLLOWINGS_IDS,
    );
    const userFollowingIds = JSON.parse(data1);
    setUserFollowing(userFollowingIds);
    if (userFollowing.includes(data.userId)) {
      toggleIsFollowed(true);
    } else {
      toggleIsFollowed(false);
    }
  }
  async function getCurrentUser() {
    const id = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
    setCurrentUserId(id);
  }
  useEffect(() => {
    onLoad();
  }, [userFollowing]);
  useEffect(() => {
    getCurrentUser();
  }, []);

  async function handleFollowClick() {
    await followUser(data.userId);
    await AsyncStorage.setItem(
      AsyncStorageConstants.USER_FOLLOWINGS_IDS,
      JSON.stringify([...userFollowing, data.userId]),
    );
    setUserFollowing([...userFollowing, data.userId]);
  }
  async function handleRemoveFollowClick() {
    await unfollowUser(data.userId);
    const index = userFollowing.indexOf(data.userId);
    userFollowing.splice(index, 1);
    await AsyncStorage.setItem(
      AsyncStorageConstants.USER_FOLLOWINGS_IDS,
      JSON.stringify(userFollowing),
    );
    setUserFollowing(userFollowing);
  }

  return (
    <View style={styles.tweetContainer}>
      <Image
        style={styles.profileImage}
        source={data?.avatar ? {uri:data.avatar} : imageDefault}></Image>

      <View style={styles.details}>
        <View style={styles.tweetHeader}>
          <Text style={styles.username}>{data.name}</Text>
        </View>
        <Text style={styles.handle}>@{data.userName}</Text>
      </View>

      {currentUserId !== data.userId &&
        (isFollowed ? (
          <TouchableOpacity style={styles.follow}>
            <Text
              style={styles.followingList1}
              onPress={handleRemoveFollowClick}>
              Following
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.follow}>
            <Text style={styles.followingList} onPress={handleFollowClick}>
              Follow
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    display: 'flex',
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    marginVertical: 1,
    margin: 10,
    padding: 5,
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 35,
    marginVertical: 5,
    marginLeft: 10,
  },
  details: {
    marginRight: 10,
    flexDirection: 'column',
    width: '80%',
    marginLeft: 10,
    //   justifyContent:'center',
    alignContent: 'center',
    //   padding: 5,
  },
  tweetHeader: {
    flexDirection: 'row',
    marginTop: 10,
    //    padding: 5,
  },
  username: {
    fontWeight: 'bold',
    color: 'black',
  },

  handle: {
    // alignSelf: 'center',
  },
  followingList: {
    padding: 5,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    color: '#00acee',
    fontSize: 13,
    position: 'absolute',
    right: 10,
    borderColor: '#00acee',
    borderWidth: 1,
    borderRadius: 35,
    fontWeight: 'bold',
  },
  followingList1: {
    padding: 5,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    color: '#00acee',
    fontSize: 13,
    position: 'absolute',
    right: 10,
    backgroundColor: '#00acee',
    color: 'white',
    borderRadius: 35,
    fontWeight: 'bold',
  },
  follow: {
    justifyContent: 'center',
  },
});
