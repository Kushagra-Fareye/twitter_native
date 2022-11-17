import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {ProfilePicture, SendIcon} from '../assets';
import {FlatList} from 'react-native-gesture-handler';
import {AdminUserCard, TweetCard} from '../components';
import Axios from '../api/Axios';
import SearchBar from '../components/SearchBar';
import {FeedString} from '../constants/Feed';

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(searchText);

  const searchArticles = () => {
    if (searchText !== '') {
      setIsLoading(true);
      console.log(searchText);
      Axios.get(`/user/search/${searchText}`, {
        params: {},
      })
        .then(response => {
          console.log(response.status);
          setUserList(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <TextInput
            placeholder="Search users..."
            style={styles.input}
            value={searchText}
            onChangeText={searchText => {
              setSearchText(searchText);
            }}
          />
        </View>
        <TouchableOpacity onPress={searchArticles}>
          <Image source={SendIcon} style={{height:25 , width:25}}/>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="rgba(42,169,224,255)" />
        </View>
      ) : (
        <FlatList
          data={userList}
          renderItem={({item}) => (
            <AdminUserCard key={item.userId} data={item} />
          )}
          keyExtractor={item => item.userId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerIconContainer: {margin: 5},
  headerIcon: {height: 25, width: 25, resizeMode: 'contain', borderRadius: 50},
  searchbar: {flex: 1, backgroundColor: '#fff'},
  container: {
    backgroundColor: '#F0F0F0',
    margin: 10,
    width: '85%',
  },
});

