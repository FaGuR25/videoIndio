import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('./img/salud.png')} style={styles.imagen} />
      <Text style={styles.texto}>
        Todavía no hay ningún recordatorio. ¡Pulsa "+" para agregar uno!
      </Text>
    </View>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#8fcbbc',
        },
        headerTintColor: '#666666',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30,
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
  imagen: {
    width: 100,
    height: 100,
  },
  texto: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});
