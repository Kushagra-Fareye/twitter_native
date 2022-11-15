import axios from 'axios';
import React, {useState} from 'react';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  addBookmark,
  getTweetData,
  likeTweet,
  postComment,
  postRetweet,
} from '../api/Tweet';
import {
  imageReply,
  imageRetweet,
  imageLike,
  imageDefault,
  imageVerified,
  Bookmark,
} from '../assets/index';

function TweetCard(props) {
  const [tweetData, setTweetData] = useState(props.tweet);
  async function fetchTweet(tweetId) {
    const tweet = await getTweetData(tweetId);
    console.log(tweet, 'reached');
    setTweetData(tweet);
  }
  useEffect(() => {
    console.log(props.tweet, 'single tweet page tweetcard');
    if (props?.msg) {
      fetchTweet(props?.tweet?.tweetId || props.tweetId);
    }
  }, []);
  async function handleCommentButtonClick(tweetId) {
    await postComment(tweetId);
    // await fetchTweet(tweetId);
  }
  async function handleBookmarkButtonClick(tweetId) {
    await addBookmark(tweetId);
    // await fetchTweet(tweetId);
  }

  async function handleRetweetButtonClick(tweetId, tweet) {
    // TODO - handle retweet click option
    await postRetweet(tweetId, tweet);
  }
  async function handleLikeButtonClick(tweetId) {
    const updatedlLikes = await likeTweet(tweetId);
    setTweetData({
      ...tweetData,
      numberofLikes: updatedlLikes,
    });
    // await fetchTweet(tweetId);
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
      <Image
        style={styles.profileImage}
        source={
          tweetData?.createdUser?.avatar
            ? {uri: `${tweetData?.createdUser?.avatar}`}
            : imageDefault
        }></Image>
      <View style={styles.details}>
        <View style={styles.tweetHeader}>
          <Text style={styles.username}>{tweetData.createdUser?.name}</Text>
          <Text style={styles.handle}>{tweetData.createdUser?.username}</Text>
          <Image
            style={styles.verifiedImage}
            source={tweetData?.createdUser?.isVerified ? imageVerified : ''}
          />
        </View>
        <View style={styles.tweet}>
          <View>
            <Text style={styles.tweetMessage}>{tweetData.text}</Text>
          </View>
          <TweetImageRendering noOfPics={1} images={tweetData.image} />
        </View>
        <View style={styles.tweetFooter}>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() => handleCommentButtonClick(tweetData.tweetId)}>
            <Image style={styles.tweetIcons} source={imageReply}></Image>
            <Text>{tweetData.numberofComments || '0'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() =>
              handleRetweetButtonClick(tweetData.tweetId, tweetData)
            }>
            <Image style={styles.tweetIcons} source={imageRetweet}></Image>
            <Text>{tweetData.numberofTweets || '0'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() => {
              handleLikeButtonClick(tweetData.tweetId);
            }}>
            <Image style={styles.tweetIcons} source={imageLike}></Image>
            <Text>{tweetData.numberofLikes || '0'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerFields}
            onPress={() => {
              handleBookmarkButtonClick(tweetData.tweetId);
            }}>
            <Image style={styles.tweetIcons} source={Bookmark}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    marginVertical: 5,
    margin: 5,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginVertical: 10,
    marginLeft: 10,
  },
  details: {
    marginRight: 10,
    marginTop: 0,
  },
  tweetHeader: {
    flexDirection: 'row',
    marginTop: 0,
  },
  username: {
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    fontWeight: 'bold',
    color: 'black',
  },

  handle: {
    alignSelf: 'center',
  },

  tweet: {
    marginHorizontal: 10,
    marginVertical: 0,
    paddingRight: 5,
  },

  tweetMessage: {
    color: 'black',
    marginRight: 95,
  },
  tweetImageContainer: {
    flexDirection: 'row',
  },
  tweetImage: {
    height: 250,
    width: 280,
    marginTop: 20,
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
    width: 300,
    marginVertical: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  footerFields: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tweetIcons: {
    height: 30,
    marginRight: 5,
    width: 30,
    resizeMode: 'contain',
  },
  verifiedImage: {
    height: 20,
    width: 20,
    borderRadius: 35,
    marginVertical: 20,
    marginLeft: 5,
  },
});

export default TweetCard;
