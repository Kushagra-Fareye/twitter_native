import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {ProfilePicture} from '../assets';
import {FlatList} from 'react-native-gesture-handler';
import Axios from '../api/Axios';
import SearchBar from '../components/SearchBar';

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState([]);
  console.log(searchText);
  // const searchArticles = (keyword) =>{
  //   Axios.get(`/user/tweets/search/${keyword}`,{
  //     params:{

  //     }
  //   })
  //   .then((response)=>{
  //     setArticles(response.data.articles);
  //   })
  //   .catch(function(error){
  //     console.log(error);
  //   })
  //   .then(function(){

  //   });

  // }
  return (
    <View>
      <SearchBar />
      {/* <TouchableOpacity
            style={styles.headerIconContainer}
            // onPress={() => navigation.openDrawer()}
            >
            <Image source={ProfilePicture} style={styles.headerIcon} />
          </TouchableOpacity>
          <View style ={styles.searchbar}>
            {/* <SearchBar 
            // searchText={searchText} 
            // setSearchText={setSearchText}
            // onSubmit={searchArticles}
            // value={searchArticles}

            /> */}
    </View>

    // </View>
  );
}

const styles = StyleSheet.create({
  headerIconContainer: {margin: 5},
  headerIcon: {height: 25, width: 25, resizeMode: 'contain', borderRadius: 50},
  searchbar: {flex: 1, backgroundColor: '#fff'},
});
