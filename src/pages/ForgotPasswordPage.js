import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  Font,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import {imageLogo, loginBG2} from '../assets';
import LinearGradient from 'react-native-linear-gradient';
import {login, signUp} from '../api/Login';
import {decode as atob, encode as btoa} from 'base-64';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

async function fetchUserInfo(password1) {
  const data = await AsyncStorage.getItem(AsyncStorageConstants.USER_DETAILS);
  const user = JSON.parse(data);
  user.password = password1;
  return user;
}

export default function ForgotPasswordPage({navigation}) {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <ImageBackground resizeMode="cover" style={styles.image}>
          <View style={styles.welcome}>
            <Image style={styles.logoImage} source={imageLogo} />
          </View>

          <LinearGradient
            colors={[
              'rgba(85,173,238,0.9)',
              'rgba(85,173,238,0.8)',
              'rgba(85,173,238,0.1)',
            ]}
            style={styles.contentContainer}>
            <View style={styles.view}>
              <TextInput
                placeholder="Enter new password..."
                style={styles.input}
                value={password1}
                onChangeText={name => {
                  setPassword1(name);
                }}></TextInput>
              <TextInput
                placeholder="Confirm password..."
                style={styles.input}
                value={password2}
                secureTextEntry={true}
                onChangeText={password => {
                  setPassword2(password);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {

                  if (password1 !== password2) {
                    Alert.alert('Password are not same');
                    setPassword2('');
                  }
                  const data = await fetchUserInfo(password1);
                  //const res = await login({name: password1, password: password2});
                  const res = await signUp(data);
                  console.log(res);
                  if (res) {
                      await AsyncStorage.setItem(
                        AsyncStorageConstants.USER_DETAILS,
                        JSON.stringify(data),
                      );
                      setPassword1('');
                      setPassword2('');
                      navigation.navigate('User Pages');
                      console.log(data);
                  } else {
                    Alert.alert('Unable to change password.');
                    setPassword1('');
                    setPassword2('');
                  }
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    //   flex: 1
  },
  forgotButton: {
    alignSelf: 'center',
  },
  adminButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  welcome: {
    flex: 2,
    //   marginTop:50,
    justifyContent: 'center',
  },

  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },

  contentContainer: {
    flex: 3,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'visible',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },

  view: {
    // borderWidth: 2,
    marginTop: 5,
    flex: 1,
  },

  innerText: {
    marginTop: 40,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  logoImage: {
    marginTop: 20,
    height: 110,
    width: 110,
    resizeMode: 'contain',
  },

  button: {
    //   backgroundColor: 'rgba(121,163,223,255)',
    backgroundColor: 'rgba(41,39,38,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 1,
    width: 150,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 20,
  },

  button2: {
    //   backgroundColor: 'rgba(255,117,146,255)',
    backgroundColor: 'rgba(41,39,38,255)',
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 2,
    width: 185,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 15,
  },

  input: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    // marginLeft: 70,
    // marginRight: 70,
    borderBottomWidth: 3,
    borderColor: 'rgba(60,64,67,255)',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  image: {
   // height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
