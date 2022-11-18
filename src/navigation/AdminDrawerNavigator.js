import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AdminAllUsersPage, AdminBlueTickRequestPage, Logout} from '../pages';
import {imageHome, imageLogout, imageVerified} from '../assets';
import {Image, StyleSheet} from 'react-native';

export default function AdminDrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Admin ALl Users Page"
        component={AdminAllUsersPage}
        options={{
          drawerLabel: 'All Users',
          drawerLabelStyle: {fontSize: 13, fontWeight: 'bold'},
          drawerIcon: ({}) => (
            <Image source={imageHome} style={styles.homeIcon} />
          ),
          drawerItemStyle: {borderRadius: 50, marginTop: 20},
        }}
      />
      <Drawer.Screen
        name="Admin Requests Page"
        component={AdminBlueTickRequestPage}
        options={{
          drawerLabel: 'Blue Tick Requests',
          drawerLabelStyle: {fontSize: 13, fontWeight: 'bold'},
          drawerIcon: ({}) => (
            <Image source={imageVerified} style={styles.homeIcon} />
          ),
          drawerItemStyle: {borderRadius: 50, marginTop: 20},
        }}
      />
      <Drawer.Screen
        name="Logout Page"
        component={Logout}
        options={{
          drawerLabel: 'Logout',
          drawerLabelStyle: {fontSize: 13, fontWeight: 'bold'},
          drawerIcon: ({}) => (
            <Image source={imageLogout} style={styles.homeIcon} />
          ),
          drawerItemStyle: {borderRadius: 50, marginTop: 20},
        }}
      />
    </Drawer.Navigator>
  );
}

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
