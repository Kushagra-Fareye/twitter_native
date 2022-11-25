import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {imageDefault} from '../assets/index';
import {deleteUser} from '../api/AdminApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

export default function AdminUserCard(props) {
  const {data} = props;
  const [currentUser, setCurrentUser] = useState({});
  const [userFollowing, setUserFollowing] = useState([]);

  async function onLoad() {
    const data2 = await AsyncStorage.getItem(
      AsyncStorageConstants.USER_FOLLOWINGS,
    );
    const details1 = JSON.parse(data2);
    setUserFollowing(details1);
    const data1 = await AsyncStorage.getItem(
      AsyncStorageConstants.USER_DETAILS,
    );
    const details = JSON.parse(data1);
    setCurrentUser(details);
  }
  useEffect(() => {
    onLoad();
  }, []);

  async function handleFollowClick() {
    await followUser(route.param.userId);
    await AsyncStorage.setItem(
      AsyncStorageConstants.USER_FOLLOWINGS,
      JSON.stringify([...userFollowing, userData]),
    );
  }
  async function handleDeleteButtonClick() {
    await deleteUser(data.userName);
  }
  return (
    <View style={styles.tweetContainer}>
      <Image
        style={styles.profileImage}
        source={data?.avatar ? data.avatar : imageDefault}></Image>

      <View style={styles.details}>
        <View style={styles.tweetHeader}>
          <Text style={styles.username}>{data.name}</Text>
          <Text style={styles.handle}>@{data.userName}</Text>
        </View>
        <View style = {{flexDirection: 'row'}}>
          <Text style={styles.dob}>DOB:</Text>
          <Text> {data?.dob?.substring(0, 10)}</Text>
        </View>
        <View style = {{flexDirection: 'row'}}>
          <Text style={styles.followers}>
            Followers:
          </Text>
          <Text> {data.numberOfFollower}</Text>
        </View>
        <View style = {{flexDirection: 'row'}}>
          <Text style={styles.following}>
            Following:
          </Text>
          <Text> {data.numberOfFollowing}</Text>
        </View>
      </View>
      {currentUser.roles ? (
        <View style={styles.button}>
          <Button title="delete" onPress={() => handleDeleteButtonClick()} />
        </View>
      ) : data.isFollowing ? (
        <TouchableOpacity onPress={handleFollowClick}>
          <Text style={styles.followingList}>Follow</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.followingList}>Following</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    marginVertical: 1,
    margin: 10,
    padding: 5,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginVertical: 20,
    marginLeft: 10,
  },
  details: {
    flex:1,
    marginRight: 10,
    // marginTop: 5,
    padding: 5,
  },
  tweetHeader: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
  },
  username: {
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 'bold',
    color: 'black',
  },

  handle: {
    // alignSelf: 'center',
  },
  dob: {
    color: 'black',
    paddingLeft: 10,
    fontWeight: 'bold'
    // paddingRight: 5,
  },
  followers: {
    color: 'black',
    paddingLeft: 10,
    fontWeight: 'bold'
    // paddingRight: 5,
  },
  following: {
    color: 'black',
    paddingLeft: 10,
    fontWeight: 'bold'
    // paddingRight: 5,
  },

  button: {
    // flex: 1,
    // alignContent: 'flex-end',
    // alignSelf: 'center',
    // justifyContent: 'flex-end',
    // flexDirection: 'row',
    // padding: 10,
    marginTop: 50,
    marginLeft: -40,
  },
  followingList: {
    padding: 10,
    color: 'black',
    fontSize: 15,
    flex: 1,
    marginTop: 45,
    position: 'absolute',
    right: 10,
    // alignItems: 'flex-end'
    // alignContent: 'flex-end',
  },
});
