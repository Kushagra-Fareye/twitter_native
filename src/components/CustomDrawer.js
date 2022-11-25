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
  const [userData, setUserData] = useState(null);
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
      {userData && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Profile', {
                userId: userData.userId,
              })
            }>
            <Image
              source={userData?.avatar ? {uri: userData.avatar} : imageDefault}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View style={{flex: 2, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Profile', {
                  userId: userData.userId,
                })
              }>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {userData.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text>@{userData.userName}</Text>
                {userData.isVerified === 3 && (
                  <Image source={imageVerified} style={styles.verified} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{marginTop: -15}}>
        <DrawerContentScrollView {...props} />
        <DrawerItemList {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    margin: 15,
    padding: 35,
    height:50,
    width:50,
    borderRadius: 100,
    flex: 6,
  },
  verified: {
    marginLeft: 8,
    height: 16,
    width: 16,
    alignSelf: 'center',
  },
});
