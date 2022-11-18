import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import {CloseIcon} from '../assets';
import { deleteUser } from '../api/AdminApi';
import { ApplyBluetick } from '../api/User';

export default function SettingsPage({navigation}) {
  async function handleDeactivateButtonClick() {
    console.log('callllllllllllllllllllllllllllllllllllllllllllled');
      await deleteUser();
      navigation.navigate("Login Page");
  }
  async function handlePasswordChangeButtonClick() {
   // await blueTickResponse(data,true);
   navigation.navigate('Forgot Password Page')
  }
  async function handleBlueTickButtonClick() {
    await ApplyBluetick();
   Alert.alert(
    "Your application was successfully sent",
      // [
      //   { text: "OK", onPress: () => console.log("OK Pressed") }
      // ]
   );
    console.log('ttttttttttttttttttttttttt');

  }
  async function handleEditProfileButtonClick() {
    navigation.navigate('Edit Profile Page');
  }
  function handleCloseButtonClick() {
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={handleCloseButtonClick}>
          <Image source={CloseIcon} style={styles.closeButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.listTab}>
        <TouchableOpacity onPress={handlePasswordChangeButtonClick}>
          <Text style={styles.tab}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listTab}>
        <TouchableOpacity onPress={handleDeactivateButtonClick}>
          <Text style={styles.tab}>Deactivate Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listTab}>
        <TouchableOpacity onPress={handleBlueTickButtonClick}>
          <Text style={styles.tab}>Apply For BlueTick</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listTab}>
        <TouchableOpacity onPress={handleEditProfileButtonClick}>
          <Text style={styles.tab}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    padding: 5,
  },
  listTab: {
    backgroundColor: '#bcdcf7',
    marginVertical: 5,
    marginHorizontal:10,
    height:50,
    borderRadius: 10,
    alignItems:'flex-start',
    justifyContent:"center",

  },
  tab: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginLeft:20
  },
  closeButton: {
    height: 30,
    width: 30,
    left: -20,
    top: -20,
  },
  closeButtonContainer: {
    margin: 20,
  },
});
