import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {addBookmark, getTweetData, likeTweet} from '../api/Tweet';
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

function StaticTweetCard(props, navigation) {
  const [tweetData, setTweetData] = useState(props.tweet);
  const [isBookmarked, toggleBookmark] = useState(false);
  const [isLiked, toggleLiked] = useState(false);
  const [isRetweeted, toggleRetweet] = useState(false);
  const [isReplied, toggleReply] = useState(false);

  async function fetchTweet(tweetId) {
    const tweet = await getTweetData(tweetId);
    setTweetData(tweet);
  }
  useEffect(() => {
    if (props.tweet?.msg) {
      fetchTweet(props?.tweet?.tweetId || props.tweetId);
    }
  }, []);

  const TweetImageRendering = image => {
    return (
      <View style={styles.tweetImageContainer}>
        <Image
          style={styles.tweetImage}
          source={{uri: `${image.images}`}}></Image>
      </View>
    );
  };

  return (
    <>
      <View style={styles.tweetContainer}>
        <Image
          style={styles.profileImage}
          source={
            tweetData?.createdUser?.avatar
              ? {uri: `${tweetData?.createdUser?.avatar}`}
              : imageDefault
          }
        />
        <View style={styles.details}>
          <View style={styles.tweetHeader}>
            <Text style={styles.username}>{tweetData.createdUser?.name}</Text>
            <Text style={styles.handle}>
              @{tweetData.createdUser?.userName}
            </Text>
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
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  tweetContainer: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
    backgroundColor: 'rgba(42,169,224,255)',
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
    marginBottom: 20,
    paddingRight: 5,
  },

  tweetMessage: {
    color: 'black',
    // marginRight: ,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
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
    width: 300,
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
  confirmationButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginRight: 10,
    // borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 15,
    // justifyContent: 'center'
  },
});

export default StaticTweetCard;
