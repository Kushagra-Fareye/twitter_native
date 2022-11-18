import {
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TweetCard} from '../components';
import {getUserBookmarkedFeed} from '../api/Feed';
import {useIsFocused} from '@react-navigation/native';
import {FeedString} from '../constants/Feed';
import {getToken} from '../api/Tweet'

export default function BookMarkPage() {
  const [bookMarkFeed, setBookMarkFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();
let userId = 1
  async function fetchFeed() {
  // const {userId, token} = await getToken();
  // console.log(userId)
    const data = await getUserBookmarkedFeed(userId);
    // console.log(data)
    setBookMarkFeed(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchFeed();
  }, [isFocused]);

  return (
    <View style = {{flex: 1,backgroundColor: 'white'}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="rgba(42,169,224,255)" />
        </View>
      ) : (
        <View>
          <FlatList
          inverted
            data={bookMarkFeed}
            renderItem={({item}) => (
              <TweetCard
                msg={item.bookmarkId}
                key={item.id}
                tweet={item.tweet}
                isBookmarked={true}
                setBookMarkFeed={setBookMarkFeed}
              />
            )}
            keyExtractor={item => item.bookmarkId}
            ListEmptyComponent={
              <Text style={styles.emptyList}>
                {FeedString.EMPTY_BOOKMARK_FEED}
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyList: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 50,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  loading: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginVertical: '50%',
  },
});
