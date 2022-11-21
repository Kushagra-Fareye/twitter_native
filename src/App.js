import {Image, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {imageLogo} from './assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from './api/Login';
import 'react-native-gesture-handler';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import {AsyncStorageConstants} from './constants/AsyncStorageConstants';
import {LoginNavigator} from './navigation/LoginNavigator';

function MainNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function handleLogin() {
    const data = await AsyncStorage.getItem(AsyncStorageConstants.USER_DETAILS);
    const credentials = JSON.parse(data);
    if (credentials) {
      const isSuccessful = await login({
        name: credentials.userName,
        password: credentials.password,
      });
      setIsLoggedIn(isSuccessful);
    }
    setIsLoading(false);
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    handleLogin();
  }, [isFocused]);

  return (
    <>
      {isLoading ? (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Image source={imageLogo} style={styles.loadingImage} />
        </SafeAreaView>
      ) : !isLoggedIn ? (
        <LoginNavigator />
      ) : (
        <DrawerNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  loadingImage: {
    alignSelf: 'center',
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
});
