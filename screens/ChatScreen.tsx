import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import CreateNotes from './CreateNotes';
import DetailsNote from './DetailsNote';
import {Touchable} from 'react-native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="crear"
        component={CreateNotes}
        options={{
          title: 'CREAR NOTAS',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#8d1874'},
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailsNote}
        options={{
          title: 'NOTAS',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#8d1874'},
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

export default function ChatScreen(props): React.JSX.Element {
  return (
    <>
      <ScrollView>
        <View>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => props.navigation.navigate('crear')}>
            <Text style={styles.textoBoton}>Agregar una nueva nota</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MyStack />
    </>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#b71375',
    borderColor: '#fc4f00',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
