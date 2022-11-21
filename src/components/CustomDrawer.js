import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image} from 'react-native';
import {imageDefault, imageVerified} from '../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CustomDrawer(props) {
  const [userData, setUserData] = useState({});
  async function handleOpenProfile() {}
  async function fetchUserData() {
    const data = await AsyncStorage.getItem(AsyncStorageConstants.USER_DETAILS);
    const userDetails = await JSON.parse(data);
    setUserData(userDetails);
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <View>
      <View style={{flexDirection: 'row', height: 80}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Profile', {
              userId: userData.userId,
            })
          }>
          <Image
            source={userData.avatar ? userData.avatar : imageDefault}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={{flex: 2, marginLeft: 20, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Profile', {
                userId: userData.userId,
              })
            }>
            <Text>{userData.name}</Text>
            <Text>@{userData.userName}</Text>
            {userData.isVerified === 3 && (
              <Image source={imageVerified} style={styles.verified} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <DrawerContentScrollView {...props} />
      <DrawerItemList {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    margin: 20,
    padding: 20,
    height: 40,
    width: 40,
    borderRadius: 80,
    flex: 6,
  },
  verified: {
    height: 10,
    width: 10,
  },
});
