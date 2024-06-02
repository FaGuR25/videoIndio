import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';

import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import FindScreen from './screens/FindScreen';
import ChatScreen from './screens/ChatScreen';
import DetailsNotes from './screens/DetailsNote';
import CreateNotes from './screens/CreateNotes';
import PostScreen from './screens/PostScreen';
import SettingsScreen from './screens/SettingsScreen';
import Edits from './screens/Edits';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// // Pantallas ocultas en el bottom tab navigator
// function HiddenStackNavigator() {
//   return (
//     <NavigationContainer>

//     <Stack.Navigator>
//       <Stack.Screen
//         name="DetailsNotes"
//         component={DetailsNotes}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="CreateNotes"
//         component={CreateNotes}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Edits"
//         component={Edits}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// Navigator para las pantallas principales en el bottom tab navigator
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
      <Tab.Screen
        name="Calendario"
        component={FindScreen}
        options={{
          tabBarIcon: props => (
            <Icon type="feather" name="search" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Plus"
        component={ChatScreen}
        options={{
          tabBarIcon: props => (
            <Icon type="feather" name="search" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={PostScreen}
        options={{
          tabBarIcon: props => (
            <Icon type="feather" name="plus-square" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={SettingsScreen}
        options={{
          tabBarIcon: props => (
            <Icon type="feather" name="settings" color={props.color} />
          ),
        }}
      />
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
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="HiddenScreens"
          component={HiddenStackNavigator}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Edits"
          component={Edits}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateNotes"
          component={CreateNotes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import FindScreen from './screens/FindScreen';
import ChatScreen from './screens/ChatScreen';
import PostScreen from './screens/PostScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: props => (
              <Icon type="antdesign" name="stepforward" color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Calendario"
          component={FindScreen}
          options={{
            tabBarIcon: props => (
              <Icon type="feather" name="dollar-sign" color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Plus"
          component={ChatScreen}
          options={{
            tabBarIcon: props => (
              <Icon type="feather" name="heart" color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Comunidad"
          component={PostScreen}
          options={{
            tabBarIcon: props => (
              <Icon
                type="ionicon"
                name="tennisball-outline"
                color={props.color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={SettingsScreen}
          options={{
            tabBarIcon: props => (
              <Icon
                type="ionicon"
                name="hardware-chip-outline"
                color={props.color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


*/

/*
return (
  <NavigationContainer>
    <Stacks />
  </NavigationContainer>
);
};
*/
