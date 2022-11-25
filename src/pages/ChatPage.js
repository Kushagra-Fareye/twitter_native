import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackButton, sendIcon, imageDefault} from '../assets';
import {FlatList} from 'react-native-gesture-handler';
import {ChatCard} from '../components';
import {getSingleChatMessages} from '../api/Message';
import {postMessage} from '../api/Message';
import {template} from 'lodash';

export default function ChatPage({navigation, route}) {
  const {data} = route.params;
  const [allMessages, setAllMessages] = useState([]);
  const [text, settext] = useState('');
  function handleCloseButtonClick() {
    navigation.navigate('All Messages');
  }
  async function fetchMessage() {
    const messageList = await getSingleChatMessages(route.params.data.userId);
    setAllMessages(messageList);
  }
  useEffect(() => {
    fetchMessage();
  }, []);
  const handleChatSubmit = async () => {
    if(text.length === 0 ){
      return;
    }
    await postMessage({text, recieverId: data.userId});
    settext(''); 
    await fetchMessage();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleCloseButtonClick}>
          <Image source={BackButton} style={styles.closeButton} />
        </TouchableOpacity>
        <Image
          style={styles.profileImage}
          source={data?.avatar ? {uri: data.avatar} : imageDefault}></Image>

        <Text style={styles.username}>{data.name}</Text>
      </View>
      <View style={styles.messageContainer}>
        <FlatList
          data={allMessages}
          renderItem={({item}) => (
            <ChatCard
              key={item.userId}
              data={item}
              isTextByMe={item.senderId !== data.userId}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.textContainer}>
        <TextInput
          placeholder="Start a new message"
          style={styles.input}
          value={text}
          onChangeText={text => settext(text)}></TextInput>
        <TouchableOpacity style={styles.sendImage} onPress={handleChatSubmit}>
          <Image source={sendIcon} style={styles.sendImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: '#efefef',
  },
  messageContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  closeButton: {
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 15,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 35,
    marginVertical: 10,
    marginLeft: 20,
  },
  username: {
    fontSize: 20,
    color: 'black',
    padding: 20,
  },
  handle: {
    fontSize: 15,
    color: 'black',
  },
  input: {
    backgroundColor: '#eaeef4',
    padding: 5,
    color: '#000',
    borderRadius: 20,
    // borderWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    height: 40,
    width: 352,
    // flex: 1
  },
  sendImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    marginTop: 2,
  },
  textContainer: {
    // flex: 1,
    flexDirection: 'row',
    // borderWidth: 2
    backgroundColor: '#f7f7f7',
  },
});
