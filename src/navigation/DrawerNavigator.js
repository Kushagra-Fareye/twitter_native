import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  AddTweetPage,
  CommentPage,
  ConfirmRetweetPage,
  EditProfilePage,
  ForgotPasswordPage,
  Logout,
  ProfilePage,
  SettingsPage,
  UserListPage,
} from '../pages';
import {Image, StyleSheet} from 'react-native';
import {
  imageEditProfile,
  imageHome,
  imageLogout,
  imageSettings,
} from '../assets';
import {CustomDrawer} from '../components';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Feed Page"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Feed Page"
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          drawerIcon: ({}) => (
            <Image source={imageHome} style={styles.homeIcon} />
          ),
          drawerItemStyle: {borderRadius: 50, marginTop: 20},
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({}) => (
            <Image source={imageSettings} style={styles.homeIcon} />
          ),
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          drawerItemStyle: {borderRadius: 50, marginTop: 0},
        }}
      />
      <Drawer.Screen
        name="Edit Profile Page"
        component={EditProfilePage}
        options={{
          drawerLabel: 'Edit profile',
          drawerIcon: ({}) => (
            <Image source={imageEditProfile} style={styles.homeIcon} />
          ),
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          drawerItemStyle: {borderRadius: 50, marginTop: 0},
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerLabel: 'Logout',
          drawerIcon: ({}) => (
            <Image source={imageLogout} style={styles.homeIcon} />
          ),
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          drawerItemStyle: {borderRadius: 50, marginTop: 0},
        }}
      />
      <Drawer.Screen
        name="Follower Page"
        component={UserListPage}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Forgot Password Page"
        component={ForgotPasswordPage}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Confirm Retweet Page"
        component={ConfirmRetweetPage}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Comment Page"
        component={CommentPage}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="Add Tweet Page"
        component={AddTweetPage}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    height: 30,
    width: 30,
    marginVertical: 5,
    marginLeft: 15,
  },

  notificationsIcon: {
    height: 25,
    width: 25,
  },

  messagesIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  bookmarksIcon: {
    height: 25,
    width: 25,
  },
});

export default DrawerNavigator;
