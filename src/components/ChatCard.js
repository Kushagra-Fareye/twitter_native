import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSingleChatMessages } from '../api/Message';
import { FlatList } from 'react-native-gesture-handler';

export default function ChatCard(props) {
  const { data,isTextByMe } = props
  return (
    <View style={styles.tweetContainer}>
      {isTextByMe ?
        <View style={styles.sending}>
          <Text style={styles.sendtext}>{data.text}</Text>
        </View>
        : <View style={styles.recieving}>
          <Text style={styles.recievetext}>{data.text}</Text>
        </View>}
    </View>
  );
}
const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: 'column',
    marginVertical: 1,
    margin: 10,
    padding: 5,
  },
  recieving: {
    alignItems: 'flex-start',
    fontSize: 20,
    padding: 5,
    margin: 2

  },
  recievetext: {
    color: 'white',
    fontSize: 17,
    padding: 12,
    backgroundColor: '#75c8ed',
    borderRadius: 25,
  },
  sendtext: {
    fontSize: 17,
    padding: 12,
    backgroundColor: '#d2d3d4',
    borderRadius: 25,
  },
  sending: {
    alignItems: 'flex-end',
    fontSize: 10,
    padding: 5,
    margin: 2
  }
})
