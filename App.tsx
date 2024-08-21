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
import AddMedice from './screens/AddMedice';
import CreateNotes from './screens/CreateNotes';
import PostScreen from './screens/PostScreen';
import SettingsScreen from './screens/SettingsScreen';
import Edits from './screens/Edits';
import MiniBlog from './screens/Miniblog';
import BlogDetailScreen from './screens/BlogDetailScreen';
import CreateCitas from './screens/CreateCitas';

import PushNotification from 'react-native-push-notification';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    // Handle notification click
  },
  popInitialNotification: true, // This ensures the initial notification is handled
  requestPermissions: false,
});

PushNotification.createChannel(
  {
    channelId: 'fatima1', // (required)
    channelName: 'Default Channel', // (required)
    channelDescription: 'A default channel', // (optional)
    soundName: 'default', // (optional)
    importance: 1, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    playSound: false,
  },
  created => console.log(`createChannel returned ${created}`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['channel_id_1']
});

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
          headerShown: true,
          headerTitle: 'Inicio',
          headerStyle: {
            backgroundColor: '#8fcbbc',
          },
          headerTitleStyle: {
            color: '#006400',
            fontWeight: 'bold',
          },
          tabBarIcon: props => (
            <Icon type="feather" name="home" color={props.color} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendario"
        component={FindScreen}
        options={{
          headerShown: true,
          headerTitle: 'Calendario',
          headerStyle: {
            backgroundColor: '#8fcbbc',
          },
          headerTitleStyle: {
            color: '#006400',
            fontWeight: 'bold',
          },
          tabBarIcon: props => (
            <Icon type="entypo" name="calendar" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={PostScreen}
        options={{
          headerShown: true,
          headerTitle: 'Blog',
          headerStyle: {
            backgroundColor: '#8fcbbc',
          },
          headerTitleStyle: {
            color: '#006400',
            fontWeight: 'bold',
          },
          tabBarIcon: props => (
            <Icon type="foundation" name="clipboard-notes" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Perfil',
          headerStyle: {
            backgroundColor: '#8fcbbc',
          },
          headerTitleStyle: {
            color: '#006400',
            fontWeight: 'bold',
          },
          tabBarIcon: props => (
            <Icon type="MaterialCommunityIcons" name="account-circle" color={props.color} />
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
        {/* <Stack.Screen
          name="Edits"
          component={Edits}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="CreateNotes"
          component={CreateNotes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddMedice"
          component={AddMedice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Plus"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MiniBlog"
          component={MiniBlog}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlogDetailScreen"
          component={BlogDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateCitas"
          component={CreateCitas}
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
