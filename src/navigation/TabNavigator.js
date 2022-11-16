import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookMarkPage, Home, NotificationsPage, SearchPage} from '../pages';
import {
  imageBookmark,
  imageHome,
  imageMessages,
  imageNotification,
  SearchIcon,
} from '../assets';
import {StackNavigator} from './StackNavigator';

const Tab = createBottomTabNavigator();

//  TODO-tabBarBadge: 3, for checking the number of messages and notifications

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgba(42,169,224,255)',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {},
        tabBarItemStyle: {
          // backgroundColor:'#00ff00',
          // margin:5,
          borderRadius: 50,
        },
        tabBarActiveBackgroundColor: '#bcdcf7',
        tabBarShowLabel: false,

        // tabBarAllowFontScaling: true,
        // tab
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({}) => (
            <Image source={imageHome} style={styles.homeIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({}) => (
            <Image source={SearchIcon} style={styles.bookmarksIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsPage"
        component={NotificationsPage}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({}) => (
            <Image
              source={imageNotification}
              style={styles.notificationsIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesPage"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({}) => (
            <Image source={imageMessages} style={styles.messagesIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="BookMarkPage"
        component={BookMarkPage}
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({}) => (
            <Image source={imageBookmark} style={styles.bookmarksIcon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  homeIcon: {
    height: 25,
    width: 25,
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
