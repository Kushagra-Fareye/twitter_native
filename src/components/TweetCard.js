import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  addBookmark,
  getTweetData,
  deleteBookmark,
  likeTweet,
  removeLike,
} from '../api/Tweet';
import {getUserBookmarkedFeed} from '../api/Feed';
import {
  imageReply,
  imageRetweet,
  imageLike,
  imageDefault,
  imageVerified,
  Bookmark,
  Bookmarked,
  imageLiked,
  imageRetweeted,
  imageReplied,
} from '../assets/index';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

function TweetCard(props) {
  const [tweetData, setTweetData] = useState(props.tweet);

  const [isRetweeted, toggleRetweet] = useState(false);
  const [isReplied, toggleReply] = useState(false);
  const [isLiked, toggleLiked] = useState(props.tweet?.isLiked);
  const [isBookmarked, toggleBookmark] = useState(
    props.isBookmarked ? props.isBookmarked : false,
  );

  async function fetchTweet(tweetId) {
    const tweet = await getTweetData(tweetId);
    setTweetData(tweet);
    console.log(tweet)
  }
  useEffect(() => {
    if(props?.tweet?.msg)
    fetchTweet(props?.tweet?.tweetId || props.tweetId);
  }, []);

  async function handleCommentButtonClick(tweetId) {
    toggleReply(!isReplied);
    console.log(tweetId);
    props.navigation.navigate('Comment Page', {
      tweetId,
    });
  }
  async function handleBookmarkButtonClick(tweetId) {
    if (isBookmarked == false) {
      await addBookmark(tweetId);
      toggleBookmark(!isBookmarked);
    }
    if (isBookmarked == true) {
      await deleteBookmark(tweetId);
      toggleBookmark(!isBookmarked);
      props?.setBookMarkFeed &&
        props.setBookMarkFeed(prevFeed => {
          const newData = prevFeed.filter(prevFeed => {
            return prevFeed.tweet !== props.tweet;
          });
          return newData;
        });
    }
  }

  async function handleRetweetButtonClick(tweetId, tweet) {
    props.navigation.navigate('Confirm Retweet Page', {tweet});
  }

  async function handleLikeButtonClick(tweetId) {
    if (isLiked) {
      const updatedLikes = await removeLike(tweetId);
      const data1 = await AsyncStorage.getItem(
        AsyncStorageConstants.USER_LIKES,
      );
      const likes = JSON.parse(data1);
      const index = likes.indexOf(tweetId);
      if (index > -1) {
        likes.splice(index, 1);
      }
      await AsyncStorage.setItem(
        AsyncStorageConstants.USER_LIKES,
        JSON.stringify(likes),
      );
      setTweetData({
        ...tweetData,
        numberOFLikes: updatedLikes,
      });
      toggleLiked(false);
    } else {
      const updatedLikes = await likeTweet(tweetId);
      toggleLiked(true);
      setTweetData({
        ...tweetData,
        numberOFLikes: updatedLikes,
      });
    }
  }

  const TweetImageRendering = image => {
    const noOfPics = 1;
    if (noOfPics == 1) {
      return (
        <View style={styles.tweetImageContainer}>
          <Image
            style={styles.tweetImage}
            source={{uri: `${image.images}`}}></Image>
        </View>
      );
    } else if (noOfPics == 2) {
      return (
        <View style={styles.tweetImageContainer}>
          <Image
            style={styles.tweetImage2_1}
            source={{uri: `${image.images[0]}`}}></Image>
          <Image
            style={styles.tweetImage2_2}
            source={{uri: `${image.images[0]}`}}></Image>
        </View>
      );
    } else if (noOfPics == 3) {
      return (
        <View style={styles.tweetImageContainer}>
          <Image
            style={styles.tweetImage3_1}
            source={{uri: `${image.images[0]}`}}></Image>
          <View style={styles.tweetImage3}>
            <Image
              style={styles.tweetImage3_2}
              source={{uri: `${image.images[0]}`}}></Image>
            <Image
              style={styles.tweetImage3_3}
              source={{uri: `${image.images[0]}`}}></Image>
          </View>
        </View>
      );
    } else if (noOfPics == 4) {
      return (
        <View style={styles.tweetImageContainer}>
          <View style={styles.tweetImage2}>
            <Image
              style={styles.tweetImage4_1}
              source={{uri: `${image.images[0]}`}}></Image>
            <Image
              style={styles.tweetImage4_2}
              source={{uri: `${image.images[0]}`}}></Image>
          </View>
          <View style={styles.tweetImage2}>
            <Image
              style={styles.tweetImage4_3}
              source={{uri: `${image.images[0]}`}}></Image>
            <Image
              style={styles.tweetImage4_4}
              source={{uri: `${image.images[0]}`}}></Image>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.tweetContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Profile', {
            userId: tweetData.postedUserId,
          });
        }}>
        <Image
          style={styles.profileImage}
          source={
            tweetData?.createdUser?.avatar
              ? {uri: tweetData.createdUser?.avatar}
              : imageDefault
          }
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <View style={styles.tweetHeader}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              props.navigation.navigate('Profile', {
                userId: tweetData.postedUserId,
              });
            }}>
            <Text style={styles.username}>{tweetData.createdUser?.name}</Text>
            <Text style={styles.handle}>
              @{tweetData.createdUser?.userName}
            </Text>
          </TouchableOpacity>
          <Image
            style={styles.verifiedImage}
            source={
              tweetData?.createdUser?.isVerified === 3 ? imageVerified : ''
            }
          />
        </View>
        <View style={styles.tweet}>
          <View>
            <Text style={styles.tweetMessage}>{tweetData.text}</Text>
          </View>
          {tweetData.image && (
            <TweetImageRendering noOfPics={1} images={tweetData.image} />
          )}
        </View>
        <View style={styles.tweetFooter}>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() => handleCommentButtonClick(tweetData.tweetId)}>
            <Image
              style={styles.tweetIcons}
              source={isReplied ? imageReplied : imageReply}></Image>
            <Text>{tweetData.numberOfComments}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() =>
              handleRetweetButtonClick(tweetData.tweetId, tweetData)
            }>
            <Image
              style={styles.tweetIcons}
              source={isRetweeted ? imageRetweeted : imageRetweet}></Image>
            <Text>{tweetData.numberOFTweets}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() => {
              handleLikeButtonClick(tweetData.tweetId);
            }}>
            <Image
              style={styles.tweetIcons}
              source={isLiked ? imageLiked : imageLike}></Image>
            <Text>{tweetData.numberOFLikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() => {
              handleBookmarkButtonClick(tweetData.tweetId);
            }}>
            <Image
              style={styles.tweetIcons}
              source={isBookmarked ? Bookmarked : Bookmark}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    // marginVertical: 5,
    // margin: 5,
    backgroundColor: 'white',
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 35,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  details: {
    marginRight: 10,
    marginTop: 0,
  },
  tweetHeader: {
    flexDirection: 'row',
    marginTop: 10,
  },
  username: {
    // alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 5,
    paddingTop: 8,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },

  handle: {
    // alignSelf: 'center',
    paddingLeft: 0,
    paddingRight: 5,
    paddingTop: 8,
  },

  tweet: {
    // marginHorizontal: 10,
    marginVertical: 0,
    paddingRight: 75,
    marginRight: 10,
  },

  tweetMessage: {
    color: 'black',
    // marginRight: ,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    // textAlign: ''
  },
  tweetImageContainer: {
    flexDirection: 'row',
  },
  tweetImage: {
    height: 250,
    width: 280,
    // marginTop: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage2_1: {
    height: 250,
    width: 138,
    marginTop: 20,
    marginHorizontal: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage2_2: {
    height: 250,
    width: 138,
    marginTop: 20,
    marginHorizontal: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage3: {
    flexDirection: 'column',
  },
  tweetImage2: {
    flexDirection: 'column',
  },
  tweetImage3_1: {
    height: 250,
    width: 138,
    marginTop: 20,
    marginHorizontal: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage3_2: {
    height: 123,
    width: 138,
    marginTop: 20,
    marginHorizontal: 2,
    marginBottom: 4,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage3_3: {
    height: 123,
    width: 138,
    // marginTop: 20,
    marginHorizontal: 2,
    borderBottomRightRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage4_1: {
    height: 123,
    width: 138,
    marginHorizontal: 2,
    marginBottom: 4,
    borderTopLeftRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage4_2: {
    height: 123,
    width: 138,
    marginHorizontal: 2,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage4_3: {
    height: 123,
    width: 138,
    marginBottom: 4,
    marginHorizontal: 2,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  tweetImage4_4: {
    height: 123,
    width: 138,
    marginHorizontal: 2,
    borderBottomRightRadius: 10,
    resizeMode: 'cover',
  },

  tweetFooter: {
    width: 280,
    // borderWidth: 2,
    marginVertical: 10,
    flexDirection: 'row',
    // marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  footerFields: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2
  },
  tweetIcons: {
    height: 20,
    marginRight: 5,
    width: 20,
    resizeMode: 'contain',
  },
  verifiedImage: {
    height: 20,
    width: 20,
    borderRadius: 35,
    marginVertical: 10,
    marginLeft: 5,
  },
});

export default TweetCard;
