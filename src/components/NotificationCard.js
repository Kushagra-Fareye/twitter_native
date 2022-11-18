import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {TwitterIcon, imageProfile, bellIcon, imageDefault} from '../assets';
import {NotificationType} from '../constants/Feed';

const props = {
  data: {
    type: NotificationType.RETWEET,
    text: ' Your Verification application was rejected',
    text1: 'New Tweet notifications from Ganesh',
    profilePic: 'set',
  },
};



const NotificationCard = ({navigation, tweet}) => {
  return (
    <View>
      {props.data.type === NotificationType.BLUE_TICK ? (
        <View style={styles.notificationContainer}>
          <Image source={TwitterIcon} style={styles.imageTwitter} />
          <View style={styles.notificationDetails}>
            <Text style={styles.notificationText}>{props.data.text}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() =>
            navigation.navigate('MessagesPage', {
              screen: 'Single Tweet Page',
              params: {
                tweet,
              },
            })
          }>
          <Image source={bellIcon} style={styles.imageTwitter}></Image>
          <View style={styles.notificationDetails}>
            <Image
              source={
                props.data.profilePic === 'set' ? imageProfile : imageDefault
              }
              style={styles.notificationImage}
            />
            <Text style={styles.notificationText}>{props.data.text1}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },

  imageTwitter: {
    height: 40,
    width: 40,
    marginLeft: 30,
    marginVertical: 10,
  },

  notificationDetails: {
    flexDirection: 'column',
    marginVertical: 10,
    marginLeft: 20,
  },

  notificationText: {
    color: 'black',
    marginTop: 5,
    marginRight: 100,
  },

  notificationImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    // marginLeft: 30,
    // marginTop: 5,
  },
});

export default NotificationCard;
