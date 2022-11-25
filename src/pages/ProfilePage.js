import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  imageBanner,
  imageBirthday,
  imageDefault,
  imageJoined,
  imageProfile,
} from '../assets';
import {TweetCard} from '../components';
import {
  followUser,
  getUserData,
  getUserTweets,
  unfollowUser,
} from '../api/User';
import {FeedString} from '../constants/Feed';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let animatedHeaderValue = new Animated.Value(0);
const headerMaxHeight = 400;
const headerMinHeight = 0;

const animatedHeaderHeight = animatedHeaderValue.interpolate({
  inputRange: [0, headerMaxHeight - headerMinHeight],
  outputRange: [headerMaxHeight, headerMinHeight],
  extrapolate: 'clamp',
});

animatedHeaderValue.addListener(({value}) => {
  this._value = value;
});

export default function ProfilePage({navigation, route}) {
  const [isFocused, setFocus] = useState('tweets');
  const [userData, setUserData] = useState({});
  const [userTweets, setUserTweets] = useState([]);
  const [userDetails, setUserDetials] = useState({});
  const [userFollowing, setUserFollowing] = useState([]);

  async function fetchUserData() {
    const data = await getUserData(
      route?.params?.userId ? route?.params?.userId : null,
    );
    const tweets = await getUserTweets(
      route?.params?.userId ? route?.params?.userId : null,
    );
    const data1 = await AsyncStorage.getItem(
      AsyncStorageConstants.USER_DETAILS,
    );
    const details = JSON.parse(data1);
    setUserDetials(details);
    const data2 = await AsyncStorage.getItem(
      AsyncStorageConstants.USER_FOLLOWINGS_IDS,
    );
    const details1 = JSON.parse(data2);
    setUserFollowing(details1);
    setUserData(data);
    setUserTweets(tweets);
  }
  async function handleFollowClick() {
      await followUser(route.params.userId);
      const updatedFollowingList = [...userFollowing, userData.userId]
      await AsyncStorage.setItem(
        AsyncStorageConstants.USER_FOLLOWINGS_IDS,
        JSON.stringify(updatedFollowingList),
      );
      setUserFollowing(updatedFollowingList);
      setUserData({
        ...userData,
        numberOfFollower:userData.numberOfFollower+1
      })
  }
  async function handleRemoveFollowClick() {
    await unfollowUser(route.params.userId);
    const index = userFollowing.indexOf(route.params.userId);
   userFollowing.splice(index, 1);
   const updatedFollowingList = userFollowing
    await AsyncStorage.setItem(
      AsyncStorageConstants.USER_FOLLOWINGS_IDS,
      JSON.stringify(userFollowing),
    );
    setUserFollowing(updatedFollowingList);
    setUserData({
      ...userData,
      numberOfFollower:userData.numberOfFollower-1
    })
 }

  
  useEffect(() => {
    fetchUserData();
  }, [useIsFocused()]);

  useEffect(() => {
    stickyIndex();
  }, [animatedHeaderValue._value]);

  const stickyIndex = () => {
    return animatedHeaderValue._value >= 400 ? [0] : '';
  };

  return (
    <SafeAreaView style={styles.profile}>
      <Animated.View style={[styles.header]}>
        <Image
          style={styles.bannerImage}
          source={
            userData.bannerImage ? {uri: userData.bannerImage} : imageBanner
          }
        />
        <View style={styles.dpandedit}>
          <Image
            source={userData?.avatar ? {uri: userData.avatar} : imageDefault}
            style={styles.profileImage}></Image>
          {route?.params?.userId === userDetails.userId ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                navigation.navigate('Edit Profile Page');
              }}>
              <Text
                style={{
                  borderWidth: 0.5,
                  marginRight: 20,
                  paddingLeft: 15,
                  paddingRight: 13,
                  paddingVertical: 5,
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: 20,
                  borderColor: 'gray',
                }}>
                Edit profile
              </Text>
            </TouchableOpacity>
          ) : userFollowing.indexOf(route?.params?.userId) > -1 ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleRemoveFollowClick}>
              <Text
                style={{
                  borderWidth: 0.5,
                  marginRight: 20,
                  paddingLeft: 15,
                  paddingRight: 13,
                  paddingVertical: 5,
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: 20,
                  borderColor: 'gray',
                  
                }}>
                Following
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleFollowClick}>
              <Text
                style={{
                  justifyContent: 'center',
                  padding: 10,
                  margin: 10,
                  backgroundColor: 'rgba(42,169,224,255)',
                  borderRadius: 20,
                  color: 'white',
                  marginTop: -5
                }}>
                Follow
              </Text>
            </TouchableOpacity>
          )}
          {route?.params?.userId !== userDetails.userId && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MessagesPage', {
                  screen: 'Chat Page',
                  params: {
                    data: userData,
                  },
                })
              }>
              <Text style={styles.messagebutton}>Message</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{userData.name}</Text>
          <Text style={styles.handle}>@{userData.userName}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
          <View style={styles.dates}>
            <Image style={styles.birthdayImage} source={imageBirthday}></Image>
            <Text>{userData?.dob?.substring(0, 10)}</Text>
            <Image style={styles.joinedImage} source={imageJoined}></Image>
            <Text>{userData?.createdAt?.substring(0, 10)}</Text>
          </View>
          <View style={styles.followInfo}>
            <TouchableOpacity
              style={styles.followingContainer}
              onPress={() =>
                navigation.navigate('Follower Page', {
                  type: 'followings',
                  userId: userData.userId,
                })
              }>
              <Text
                style={{color: 'black', fontWeight: 'bold', marginRight: 5}}>
                {userData.numberOfFollowing}
              </Text>
              <Text style={{marginRight: 15}}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.followersContainer}
              onPress={() =>
                navigation.navigate('Follower Page', {
                  type: 'followers',
                  userId: userData.userId,
                })
              }>
              <Text
                style={{color: 'black', fontWeight: 'bold', marginRight: 5}}>
                {userData.numberOfFollower}
              </Text>
              <Text style={{marginRight: 5}}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedHeaderValue}}}],
          {useNativeDriver: false},
        )}
        stickyHeaderIndices={stickyIndex()}>
        <View style={{paddingTop: headerMaxHeight}}>
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.tweets}>
              <Text
                style={
                  isFocused == 'tweets' ? styles.focused : styles.tweetText
                }>
                Tweets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.media}>
              <Text
                style={
                  isFocused == 'media' ? styles.focused : styles.tweetText
                }>
                Media
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likes}>
              <Text
                style={
                  isFocused == 'likes' ? styles.focused : styles.tweetText
                }>
                Likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            data={userTweets}
            renderItem={({item}) => (
              <TweetCard key={item.tweetId} tweet={item} />
            )}
            keyExtractor={item => item.tweetId}
            ListEmptyComponent={
              <Text style={styles.emptyList}>
                {FeedString.EMPTY_PROFILE_PAGE_TWEETS}
              </Text>
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('MessagesPage', {screen: 'Add Tweet Page'})
        }>
        <Text
          style={{fontSize: 50, margin: -7, color: 'white', fontWeight: '100'}}>
          +
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    overflow: 'hidden',
    zIndex: 999,
    // STYLE
    borderBottomColor: '#EFEFF4',
    borderBottomWidth: 2,
    height: animatedHeaderHeight,
    backgroundColor: 'white',
    // padding: 10,
    // position: 'absolute'
  },
  bannerImage: {
    height: 150,
    width: screenWidth,
    resizeMode: 'cover',
  },

  dpandedit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profileImage: {
    marginTop: -40,
    height: 90,
    width: 90,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 45,
    marginLeft: 10,
  },

  editButton: {
    marginTop: 15,
  },

  profileInfo: {
    marginTop: 10,
  },

  username: {
    // alignSelf: 'center',
    fontSize: 23,
    marginLeft: 15,
    marginRight: 5,
    fontWeight: 'bold',
    color: 'black',
  },

  handle: {
    // alignSelf: 'center',
    marginLeft: 15,
  },

  bio: {
    // alignSelf: 'center',
    marginTop: 15,
    marginLeft: 15,
    color: 'black',
    marginRight: 10,
    fontSize: 17,
  },

  dates: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },

  birthdayImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 14,
  },

  joinedImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginLeft: 20,
    marginRight: 10,
  },

  followInfo: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
  },
  followingContainer: {
    flexDirection: 'row',
  },
  followersContainer: {
    flexDirection: 'row',
  },

  tabs: {
    flexDirection: 'row',
    // marginTop: 10,
    height: 40,
    // paddingTop: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  tweetText: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  focused: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },

  tweets: {
    flex: 1,
    alignItems: 'center',
  },
  media: {
    flex: 1,
    alignItems: 'center',
  },
  likes: {
    flex: 1,
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: 'rgba(42,169,224,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
    position: 'absolute',
    right: 30,
    bottom: 15,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyList: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  messagebutton:{
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(42,169,224,255)',
    borderRadius: 20,
    color: 'white',
  },
  message: {
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
});
