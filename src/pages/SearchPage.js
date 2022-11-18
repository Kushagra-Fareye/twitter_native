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
import {ProfilePicture, SearchIcon, SendIcon} from '../assets';
import {FlatList} from 'react-native-gesture-handler';
import {UserCard, TweetCard} from '../components';

import Axios from '../api/Axios';
import SearchBar from '../components/SearchBar';
import {FeedString} from '../constants/Feed';
import {fetchTrendingUser} from '../api/User';

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('search');
  console.log(searchText);

  async function fetchTrending() {
    const data = await fetchTrendingUser();
    console.log(data);
    setUserList(data);
  }
  useEffect(() => {
    console.log('called her elease');
    if (type !== 'search') {
      fetchTrending();
    } else {
      searchArticles();
    }
  }, [type]);

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
    <View style={{backgroundColor: 'white', marginBottom: 140, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5
        }}>
          <TextInput
            placeholder="Search users..."
            style={styles.input}
            value={searchText}
            onChangeText={searchText => {
              setSearchText(searchText);
            }}
          />
        <TouchableOpacity onPress={searchArticles}>
          <Image source={SearchIcon} style={{height: 25, width: 25,}} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setType('search')}  style={styles.buttons}>
          <Text style = {{fontSize: 15, fontWeight: 'bold'}}>Search</Text>
        </TouchableOpacity>
        <Text style={styles.button}></Text>
        <TouchableOpacity  style={styles.buttons}
          onPress={() => {
            console.log('ghjkjhgfghjkjhgf');
            setUserList([]);
            setType('trending');
          }}>
          <Text style = {{fontSize: 15, fontWeight: 'bold'}}>Who to follow...?</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', marginVertical: 200}}>
          <ActivityIndicator size="large" color="rgba(42,169,224,255)" />
        </View>
      ) : (
        // <View  style = {{marginBottom: 2}} >
          <FlatList
          data={userList}
          renderItem={({item}) => <UserCard key={item.userId} data={item} />}
          keyExtractor={item => item.userId}
        />
        // </View>
        
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
  buttons: {
    flex: 1,
    // padding: 5,
    // paddingHorizontal: 25,
    paddingVertical: 15,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    alignItems: 'center',
    marginVertical: 5,
    color: 'black',
    fontSize: 15,
    // backgroundColor: 'gray'
    // position: 'absolute',
    // right: 10,
    // backgroundColor: '#00acee',
    // borderColor: '',
    // borderWidth: 0.5,
    // borderRadius: 35,
    // fontWeight: 'bold',
    // borderRightWidth: 0.5,
    // borderLeftWidth: 0.5,
    // alignSelf: 'auto'
    // justifyContent: 'center'
  },
  input: {
    // height: 40,
    width: "85%",
    // margin: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // marginLeft: 70,
    // marginRight: 70,
    // borderLeftWidth: 0.1,
    // borderRightWidth: 0.1,
    // borderTopWidth: 0.07,
    // borderBottomWidth: 0.1,
    borderColor: 'rgba(42,169,224,255)',
    // marginLeft: 'auto',
    marginRight: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: 'gray'
  },
  button: {
    // padding: 5,
    // flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 25,
    paddingVertical: 10,
    // marginHorizontal: 15,
    marginVertical: 5,
    color: 'black',
    fontSize: 15,
    // position: 'absolute',
    // right: 10,
    // backgroundColor: '#00acee',
    borderColor: '#00acee',
    // borderWidth: 0.5,
    fontWeight: 'bold',
    borderRightWidth: 0.5,
    // borderLeftWidth: 0.5
  },
});
