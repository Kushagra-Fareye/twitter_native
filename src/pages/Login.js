import React, {useEffect, useState} from 'react';
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
import {login} from '../api/Login';
import {decode as atob, encode as btoa} from 'base-64';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const loginBG = {
  uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-53634.jpg?w=740&t=st=1668187272~exp=1668187872~hmac=33656eceaa60cba5a52189321212c1eded1a06622ef818cef8226bb835d01c7f',
};

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  let data = {
    name,
    password,
  };
  const isFocused = useIsFocused();
  async function checkCredentials() {
    const data = await AsyncStorage.getItem(AsyncStorageConstants.CREDENTIALS);
    const credentials = JSON.parse(data);
  }
  useEffect(() => {}, []);

  return (
    <KeyboardAvoidingView
    //   style={styles.container}
    >
      <ScrollView>
        <ImageBackground
          source={loginBG2}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.adminButton}>
            <Text style={{color: 'white'}}>Are you an admin?</Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate('Admin Login Page')}
                style={{color: 'rgba(42,169,224,255)'}}>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
                placeholder="Type your username..."
                style={styles.input}
                value={name}
                onChangeText={name => {
                  setName(name);
                }}></TextInput>
              <TextInput
                placeholder="Type your password..."
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={password => {
                  setPassword(password);
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  const res = await login({name, password});
                  if (res) {
                    navigation.navigate('User Pages');
                    setName('');
                    setPassword('');
                  } else {
                    Alert.alert('Login Failed', 'Invalid Username or Password');
                    setName('');
                    setPassword('');
                  }
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.forgotButton}>
                <Text
                  style={{fontSize: 12, color: 'white'}}
                  onPress={() => navigation.navigate('Forgot Password Page')}>
                  Forgot Password..?
                </Text>
              </TouchableOpacity>
              <Text style={styles.innerText}>Don't have an account?</Text>
              <TouchableOpacity style={styles.button2}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}
                  onPress={() => navigation.navigate('Signup Page')}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
