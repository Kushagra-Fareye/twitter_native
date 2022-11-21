import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddTweetPage, ChatPage, MessagesPage, SingleTweetPage} from '../pages';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="All Messages">
      <Stack.Screen
        name="All Messages"
        component={MessagesPage}
        options={{
          title: 'All Messages',
          headerStyle: {
            backgroundColor: 'white',
          },

          headerTintColor: '#fff',
          headerLeft: null,
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen
        name="Chat Page"
        component={ChatPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Single Tweet Page"
        component={SingleTweetPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export {StackNavigator};
