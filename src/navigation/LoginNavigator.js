import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AdminLoginPage, ForgotPasswordPage, Login, Signup} from '../pages';
import AdminDrawerNavigator from './AdminDrawerNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login Page"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup Page"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Admin Login Page"
        component={AdminLoginPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Forgot Password Page"
        component={ForgotPasswordPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Admin Pages"
        component={AdminDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="User Pages"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export {LoginNavigator};
