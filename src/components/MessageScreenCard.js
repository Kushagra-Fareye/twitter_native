import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {imageDefault} from '../assets';

export default function MessageScreenCard(props) {
  const {data} = props;
  return (
    <TouchableOpacity>
      <View style={styles.tweetContainer}>
        <Image
          style={styles.profileImage}
          source={data?.avatar ? {uri: data.avatar} : imageDefault}></Image>

        <View style={styles.details}>
          <View style={styles.tweetHeader}>
            <Text style={styles.username}>{data.name}</Text>
            <Text style={styles.handle}>@{data.userName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    //borderTopWidth: 1,
    borderBottomWidth: .5,
    borderColor: 'gray',
    flexDirection: 'row',
    marginVertical: 2,
    margin: 5,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 35,
    marginVertical: 15,
    marginLeft: 10,
  },
  details: {
    marginRight: 10,
    // marginTop: 5,
    padding: 5,
  },
  tweetHeader: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
  },
  username: {
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },

  handle: {
    alignSelf: 'center',
    fontSize: 15,
  },
  message: {
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    color: 'black',
    fontSize: 15,
  },
});
