import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {StaticTweetCard, TweetCard} from '../components';
import {postRetweet} from '../api/Tweet';

export default function ConfirmRetweetPage({navigation, route}) {
  const {tweet} = route.params;
  async function handleRetweet() {
    const data = await postRetweet(tweet.tweetId);
    console.log(data);
    navigation.navigate('Feed Page');
  }
  return (
    <View>
      <StaticTweetCard tweet={tweet} />
      <View style={styles.confirmationButton}>
        <Text style={{color: 'black', fontSize: 20, flex: 2}}>Retweet?</Text>
        <TouchableOpacity>
          <Text onPress={handleRetweet} style={styles.button}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('Feed Page')}
            style={styles.button}>
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmationButton: {
    marginTop: 20,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    marginRight: 10,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 15,
  },
  button: {
    color: 'rgba(42,169,224,255)',
    fontSize: 20,
    flex: 2,
    marginLeft: 30,
  },
});
