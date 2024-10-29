import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import HomeScreen from './screens/Inicio';
import FindScreen from './screens/FindScreen';
import PostScreen from './screens/PostScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#E8F5E9', // Fondo verde claro
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#388E3C', // Verde oscuro para ícono activo
        tabBarInactiveTintColor: '#A5D6A7', // Verde claro para ícono inactivo
      }}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon type="material" name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={FindScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon type="material-community" name="calendar" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon type="material" name="description" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
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
