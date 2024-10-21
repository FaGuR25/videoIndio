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
    left: 0,
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

/* type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}; */

function Login({navigation}: {navigation: any}): React.JSX.Element {
  // const [usuario, setUsuario] = useState('');
  // const [contrasena, setContrasena] = useState('');

  const btnIngresarOnPress = function () {
    //if (usuario && contrasena) {
    navigation.navigate('Tabs');
    return;
    //}
    //Alert.alert('Fallido', 'Datos incorrectos...');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <View style={styles.diagonalLinesContainer}>
          {/* Repite las líneas diagonales */}
          <View style={[styles.diagonalLine, {top: '5%'}]} />
          <View style={[styles.diagonalLine, {top: '10%'}]} />
          <View style={[styles.diagonalLine, {top: '15%'}]} />
          <View style={[styles.diagonalLine, {top: '20%'}]} />
          <View style={[styles.diagonalLine, {top: '25%'}]} />
          <View style={[styles.diagonalLine, {top: '30%'}]} />
          <View style={[styles.diagonalLine, {top: '35%'}]} />
          <View style={[styles.diagonalLine, {top: '40%'}]} />
          <View style={[styles.diagonalLine, {top: '45%'}]} />
          <View style={[styles.diagonalLine, {top: '50%'}]} />
          <View style={[styles.diagonalLine, {top: '55%'}]} />
          <View style={[styles.diagonalLine, {top: '60%'}]} />
          <View style={[styles.diagonalLine, {top: '65%'}]} />
          <View style={[styles.diagonalLine, {top: '70%'}]} />
          <View style={[styles.diagonalLine, {top: '75%'}]} />
          <View style={[styles.diagonalLine, {top: '80%'}]} />
          <View style={[styles.diagonalLine, {top: '85%'}]} />
          <View style={[styles.diagonalLine, {top: '90%'}]} />
        </View>

        <View style={styles.container}>
          <Image
            source={require('../assets/icons/logome.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.TextoPrincipal}>AgendaSalud</Text>
        </View>
        {/* <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Usuario"
          placeholderTextColor="#004d40"
          onChangeText={u => setUsuario(u)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          placeholderTextColor="#004d40"
          secureTextEntry={true}
          onChangeText={p => setContrasena(p)}
        /> */}
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={btnIngresarOnPress}>
            Ingresar
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

export default Login;
