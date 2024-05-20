import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import FindScreen from './screens/FindScreen';
import ChatScreen from './screens/ChatScreen';
import PostScreen from './screens/PostScreen';
import SettingsScreen from './screens/SettingsScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Inicio">
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: props => (
            <Icon type="feather" name="home" color={props.color} />
          ),
        }}
      />
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
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
