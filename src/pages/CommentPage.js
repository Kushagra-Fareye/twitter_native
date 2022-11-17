import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
// import { TextInput } from "react-native-gesture-handler";
import CommentCard from '../components/CommentCard';
import {FeedString} from '../constants/Feed';
import {getUserComment, postComment} from '../api/Tweet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

export default function CommentPage({navigation, route}) {
  const {tweetId} = route.params;
  const [commentFeed, setcommentFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  const isFocused = useIsFocused();
  async function fetchComment() {
    const data = await getUserComment(tweetId);
    setcommentFeed(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchComment();
  }, [isFocused]);

  const handleCommentSubmit = async () => {
    const userId = await AsyncStorage.getItem(AsyncStorageConstants.USER_ID);
    let data = {
      commentText: commentText,
      userId: userId,
      tweetId: tweetId,
    };
    await postComment(data);
    await fetchComment();
    setCommentText('');
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color="rgba(42,169,224,255)" />
          </View>
        ) : (
          <>
            <FlatList
              inverted={true}
              // onLayout={() => this.flatList.scrollToEnd({animated: true})}
              data={commentFeed}
              renderItem={({item}) => (
                <CommentCard tweet={item} key={item.commentId} />
              )}
              keyExtractor={item => item.commentId}
              ListEmptyComponent={
                <Text style={styles.emptyList}>
                  {FeedString.EMPTY_COMMENTS}
                </Text>
              }
            />
            <TextInput
              placeholder="Comment..."
              style={styles.commentbox}
              value={commentText}
              onChangeText={commentText => {
                setCommentText(commentText);
              }}
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleCommentSubmit}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                Send
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  commentbox: {
    backgroundColor: '#fff',
    padding: 10,
    color: '#000',
    borderRadius: 50,
    borderWidth: 0.5,
    marginHorizontal: 20,
    // marginTop: 625
  },
  emptyList: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  commentButton: {
    backgroundColor: 'rgba(42,169,224,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 2,
    width: 185,
    alignItems: 'center',
    // marginLeft: '30',
    // marginRight: 'auto',
    marginBottom: 20,
    marginTop: 15,
  },
});
