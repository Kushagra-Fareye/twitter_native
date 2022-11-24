import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {imageLogo, loginBG2} from '../assets';
import LinearGradient from 'react-native-linear-gradient';
import {logout} from '../api/User';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Logout({navigation}) {
  async function handleLogout() {
    console.log('Logout called');
    await logout();
    await navigation.navigate('Login Page');
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
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
            <View style={styles.view}>
              <Text style={styles.text}>Log out of Twitter?</Text>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}
                  onPress={handleLogout}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}
                  onPress={() => navigation.goBack()}>
                  Cancel
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
  container: {},

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
    justifyContent: 'center',
  },

  text: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },

  contentContainer: {
    flex: 3,
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
