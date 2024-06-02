import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';

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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  TextInput: {
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
});

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Login({navigation}: LoginProps): React.JSX.Element {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const btnIngresarOnPress = function () {
    if (usuario && contrasena) {
      navigation.navigate('Tabs');
      return;
    }
    Alert.alert('Fallido', 'Datos incorrectos...');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/logome.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Iniciar Sesión</Text>
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
        />
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={btnIngresarOnPress}>
            Ingresar
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
