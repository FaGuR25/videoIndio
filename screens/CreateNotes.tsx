import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

export default function CreateNotes({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [notas, setNotas] = useState('');

  const handleSaveNote = () => {
    if (titulo === '' || notas === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ titulo, notas });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Notas', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Alert.alert('Nota guardada', 'Tu nota ha sido guardada exitosamente.');
        navigation.navigate(''); // Navega de vuelta a la pantalla de inicio
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Notas"
        value={notas}
        onChangeText={setNotas}
      />
      <Button title="Guardar Nota" onPress={handleSaveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
