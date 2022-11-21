import {
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserCard} from '../components';
import {useIsFocused} from '@react-navigation/native';
import {FeedString} from '../constants/Feed';
import {getUserList} from '../api/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

let userId = 1;
export default function UserListPage(props) {
  const {type, userId} = props.route.params;
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();
  async function fetchData() {
    const data = await getUserList({type, userId});
    const data2 = await AsyncStorage.getItem(
      AsyncStorageConstants.USER_FOLLOWINGS,
    );
    const details1 = JSON.parse(data2);
    setIsLoading(false);
    const updatedUsers = data.map(user => {
      if (details1.includes(user)) {
        return {
          ...user,
          isFollowing: true,
        };
      }
      return {
        ...user,
        isFollowing: false,
      };
    });
    setUserList(updatedUsers);
  }
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="rgba(42,169,224,255)" />
        </View>
      ) : (
        <FlatList
          data={userList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Profile', {
                  userId: item.userId,
                });
              }}>
              <UserCard key={item.userId} data={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.userId}
          ListEmptyComponent={
            <Text style={styles.emptyList}>
              {type === 'followers'
                ? FeedString.EMPTY_FOLLOWER_LIST
                : FeedString.EMPTY_FOLLOWING_LIST}
            </Text>
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  emptyList: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 100,
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
