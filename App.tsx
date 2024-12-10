import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Login from './screens/Login';
import BlogDetailScreen from './screens/BlogDetailScreen';
import HomeScreen from './screens/Inicio';
import FindScreen from './screens/FindScreen';
import PostScreen from './screens/PostScreen';
import AddMedice from './screens/AddMedice';
import CreateNotes from './screens/CreateNotes';
import MiniBlog from './screens/Miniblog';
import CreateCitas from './screens/CreateCitas';
import PushNotification from 'react-native-push-notification';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  popInitialNotification: true,
  requestPermissions: false,
});

PushNotification.createChannel(
  {
    channelId: 'fatima1',
    channelName: 'Default Channel',
    channelDescription: 'A default channel',
    soundName: 'default',
    importance: 1,
    vibrate: true,
    playSound: true,
  },
  created => console.log(`createChannel returned ${created}`),
);

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids);
});

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#018856',
          borderTopWidth: 2,
          elevation: 5,
          borderRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          color: 'white',
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarIconStyle: {
          marginTop: 4,
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon type="feather" name="home" color="white" />
          ),
        }}
      />

      <Tab.Screen
        name="Calendario"
        component={FindScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon type="entypo" name="calendar" color="white" />
          ),
        }}
      />

      <Tab.Screen
        name="Blog"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon type="foundation" name="clipboard-notes" color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
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
