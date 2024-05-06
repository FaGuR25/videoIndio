import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './screens/Login';

import HomeScreen from './screens/HomeScreen';
import FindScreen from './screens/FindScreen';
import ChatScreen from './screens/ChatScreen';
import PostScreen from './screens/PostScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: '#ffa000'},
          }}
        />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Find" component={FindScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Setting" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/*
return (
  <NavigationContainer>
    <Stacks />
  </NavigationContainer>
);
};

*/
