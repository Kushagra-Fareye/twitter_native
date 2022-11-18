import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SendIcon} from '../assets';
import {FlatList} from 'react-native-gesture-handler';
import {UserCard} from '../components';
import Axios from '../api/Axios';
import {fetchTrendingUser} from '../api/User';
import {searchAPI} from '../api/Search';

export default function SearchPage({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('search');

  async function fetchTrending() {
    const data = await fetchTrendingUser();
    setUserList(data);
  }
  useEffect(() => {
    if (type !== 'search') {
      fetchTrending();
    } else {
      searchArticles();
    }
  }, [type]);

  const searchArticles = async () => {
    if (searchText !== '') {
      setIsLoading(true);
      const data = await searchAPI(searchText);
      setUserList(data);
      setIsLoading(false);
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
          <Image source={SendIcon} style={{height: 25, width: 25}} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          onPress={() => {
            setSearchText('');
            setType('search');
            setUserList([]);
          }}
          style={{flex: 2, alignSelf: 'center'}}>
          Search
        </Text>
        <Text
          style={{flex: 2, alignSelf: 'center'}}
          onPress={() => {
            setUserList([]);
            setType('trending');
          }}>
          Who to follow..?
        </Text>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="rgba(42,169,224,255)" />
        </View>
      ) : (
        <FlatList
          data={userList}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.userId}
              onPress={() => {
                navigation.navigate('Profile', {
                  userId: item.userId,
                });
              }}>
              <UserCard data={item} />
            </TouchableOpacity>
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
