import {Text, View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {imageDefault} from '../assets/index';

export default function CommentCard({tweet}) {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.tweetContainer}>
        <Image
          style={styles.profileImage}
          source={
            tweet?.user?.avatar ? {uri:tweet.user.avatar} : imageDefault
          }></Image>
        <View style={styles.details}>
          <View style={styles.tweetHeader}>
            <Text style={styles.username}>{tweet.user.name}</Text>
            <Text style={styles.username}>@{tweet.user.userName}</Text>
          </View>
          <View>
            <Text style={styles.comment}>{tweet.commentText}</Text>
          </View>
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
    margin: 10,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginVertical: 20,
    marginLeft: 10,
  },
  details: {
    marginRight: 10,
    marginTop: 10,
  },
  tweetHeader: {
    flexDirection: 'row',
    marginTop: 10,
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
  comment: {
    color: 'black',
    paddingLeft: 10,
    paddingRight: 5,
    fontSize: 15,
  },
});
