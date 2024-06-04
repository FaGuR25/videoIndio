import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Button as RNButton} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export default function Edits() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Correo electrónico no es válido');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      nombre: name,
      correo: email,
      contrasena: password,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:3100/Guardar', requestOptions)
      .then(response => response.json())
      .then(async result => {
        
        console.log(result);
        Alert.alert('Éxito', 'Datos guardados correctamente');

        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Ocurrió un error al guardar los datos');
      });
  };

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Datos</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Correo:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, {flex: 1}]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showButtonText}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <RNButton
          title="Guardar"
          onPress={handleSave}
          buttonStyle={styles.saveButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E8F5E9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  showButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  showButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
  },
});
