import {
  SafeAreaView,
  StyleSheet,
  View,
  //TextInput,
  //Button,
  Text,
  //Alert,
  Image,
  //Pressable,
} from 'react-native';
import React from 'react';
//import HomeScreen from './HomeScreen';
//import PushNotification from 'react-native-push-notification';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  screen: {
    height: '100%',
    backgroundColor: '#e0f2f1',
    justifyContent: 'center',
    alignContent: 'center',
  },
  diagonalLinesContainer: {
    position: 'absolute',
    top: 0,
    left: -300,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  diagonalLine: {
    position: 'absolute',
    width: '300%',
    height: 3,
    backgroundColor: '#b2dfdb',
    transform: [{rotate: '45deg'}],
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  TextInput: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '80%',
    margin: 8,
    borderColor: '#80cbc4',
  },
  buttonContainer: {
    backgroundColor: '#00796b',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 130,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#004d40',
    marginBottom: 20,
  },
  TextoPrincipal: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'Autumn_Children.ttf',
  },
});

const topValues = Array.from({length: 40}, (_, index) => index * 5); // Cambia 40 por la cantidad de líneas que necesites

function Login({navigation}: {navigation: any}): React.JSX.Element {
  const btnIngresarOnPress = function () {
    navigation.navigate('Tabs');
    return;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <View style={styles.diagonalLinesContainer}>
          {topValues.map((value, index) => (
            <View
              key={index}
              style={[styles.diagonalLine, {top: `${value}%`}]}
            />
          ))}
        </View>

        <View style={styles.container}>
          <Image
            source={require('../assets/icons/logome.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Animatable.Text
            animation="fadeIn"
            duration={2000}
            style={styles.TextoPrincipal}>
            Agenda Salud
          </Animatable.Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={btnIngresarOnPress}>
            Ingresar
          </Text>
        </View>
      </View>
    </SafeAreaView>
    /* <TouchableOpacity
        onPress={() => {
          PushNotification.localNotificationSchedule({
            channelId: 'fatima1', // (required for Android)
            title: 'medicamentos 15 segundos', // (optional)
            message: 'tomate los medicamentos', // (required)
            date: new Date(Date.now() + 15 * 1000),
            allowWhileIdle: true,
          });
        }}>
        <Text>boton</Text>
      </TouchableOpacity> */
  );
}

export default Login;
