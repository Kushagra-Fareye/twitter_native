import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getAllUserMessages} from '../api/Message';
import {LoadingImage} from '../assets';
import {MessageScreenCard} from '../components';
import {FeedString} from '../constants/Feed';
import {TouchableOpacity} from 'react-native-gesture-handler';

let userId = 1;
export default function MessagesPage({navigation}) {
  const [allMessages, setallMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();
  
  async function fetchAllUserMessages() {
    const data = await getAllUserMessages(userId);
    setallMessages(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchAllUserMessages();
  }, [isFocused]);

  return (
    <View style= {{flex: 1,backgroundColor: 'white'}}>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', marginVertical: 200}}>
        <ActivityIndicator size="large" color="rgba(42,169,224,255)" />
      </View>
      ) : (
        <FlatList
          data={allMessages}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Chat Page',{data:item})}>
              <MessageScreenCard data={item} key={item.id} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyList}>{FeedString.EMPTY_MESSAGES}</Text>
          }
        />
      )}
    </View>
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
