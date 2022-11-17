import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AdminAllUsersPage, AdminBlueTickRequestPage} from '../pages';

export default function AdminDrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Admin ALl Users Page"
        component={AdminAllUsersPage}
        options={{
          drawerLabel: 'All Users',
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
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
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
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
          drawerLabel: 'Logout',
          drawerLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          drawerIcon: ({}) => (
            <Image source={imageHome} style={styles.homeIcon} />
          ),
          drawerItemStyle: {borderRadius: 50, marginTop: 20},
        }}
      />
    </Drawer.Navigator>
  );
}
