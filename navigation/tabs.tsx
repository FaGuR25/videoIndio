import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import FindScreen from '../screens/FindScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Find') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
