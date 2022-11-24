import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {imageLogo, loginBG2} from '../assets';
import DatePicker from 'react-native-date-picker';
import {signUp} from '../api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstants} from '../constants/AsyncStorageConstants';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const image = {
  uri: 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-53634.jpg?w=740&t=st=1668187272~exp=1668187872~hmac=33656eceaa60cba5a52189321212c1eded1a06622ef818cef8226bb835d01c7f',
};

const Signup = ({navigation}) => {
  const [dob, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [dobtext, setDobtext] = useState('');
  let user = {
    userName: userName,
    name: name,
    password: password,
    dob: dob,
  };
  const getDate = () => {
    let tempDate = dob.toString().split(' ');
    return dobtext !== ''
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : 'Enter Date Of Birth';
  };

  const handleSubmit = async () => {
    const userData = await signUp({user});
    if (userData === 400) {
      Alert.alert('Twitter Handle already exists.');
      return;
    }
    if (userData) {
      Alert.alert('New User is Created.', 'Please Login to Continue.');
      navigation.navigate('Login Page');
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={loginBG2}
          resizeMode="cover"
          style={styles.image}>
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
            <View>
              <View style={styles.inputs}>
                {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 60}}>SIGN-UP</Text> */}
                <TextInput
                  placeholder="Type your Name..."
                  style={styles.input}
                  value={name}
                  onChangeText={name => {
                    setName(name);
                  }}></TextInput>
                <TextInput
                  placeholder="Type your Handle..."
                  style={styles.input}
                  value={userName}
                  onChangeText={userName => {
                    setUserName(userName);
                  }}></TextInput>

                <TextInput
                  placeholder="Type your password..."
                  style={styles.input}
                  textContentType="newPassword"
                  secureTextEntry
                  value={password}
                  onChangeText={password => {
                    setPassword(password);
                  }}
                />

                <View>
                  <TouchableOpacity
                    title="Open"
                    onPress={() => setOpen(true)}
                    style={styles.dateButton}>
                    <DatePicker
                      modal
                      open={open}
                      date={dob}
                      mode="date"
                      // androidVariant='iosClone'
                      onConfirm={date => {
                        setOpen(false);
                        setDate(date);
                        setDobtext(date.toString());
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />

                    <Text style={styles.input}>{getDate()}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.innerText}>Already have an account?</Text>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('Login Page')}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* </View> */}
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },

  welcome: {
    // flex: 2,
    marginTop: 100,
    justifyContent: 'center',
  },

  contentContainer: {
    // flex: 3,
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
    marginTop: 80,
  },

  dateButton: {},

  inputs: {
    // borderWidth: 2,
    marginTop: 5,
    //   flex: 1,
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
    height: 100,
    width: 120,
  },

  signupButton: {
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

  loginButton: {
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

export default Signup;
