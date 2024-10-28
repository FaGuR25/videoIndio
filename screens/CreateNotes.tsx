import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

export default function CreateNotes({navigation}: {navigation: any}) {
  const [titulo, setTitulo] = useState('');
  const [notas, setNotas] = useState('');

  const handleSaveNote = () => {
    if (titulo === '' || notas === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      titulo,
      notas,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Notas', requestOptions)
      .then(response => response.json())
      .then(result => {
        Alert.alert('Nota guardada', 'Tu nota ha sido guardada exitosamente.');
        navigation.navigate('Inicio');
      })
      .catch(error => console.error(error));
  };

  const caractTit = 150;
  const caractNot = 250;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={text => setTitulo(text.slice(0, caractTit))}
        placeholderTextColor="#A9A9A9"
      />
      <Text
        style={
          styles.charCount
        }>{`${titulo.length}/${caractTit} caracteres`}</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Notas"
        value={notas}
        onChangeText={text => setNotas(text.slice(0, caractNot))}
        placeholderTextColor="#A9A9A9"
        multiline
      />
      <Text
        style={
          styles.charCount
        }>{`${notas.length}/${caractNot} caracteres`}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
        <Text style={styles.buttonText}>Guardar Nota</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botonCancelar}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textoBtn}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  charCount: {
    fontSize: 12,
    color: '#388E3C',
    textAlign: 'right',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8F7', // Un verde claro suave de fondo
  },
  input: {
    height: 50,
    borderColor: '#66BB6A', // Un verde vibrante para el borde
    borderWidth: 1,
    borderRadius: 10, // Bordes redondeados
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff', // Fondo blanco
    color: '#333', // Texto oscuro
    fontSize: 16,
    shadowColor: '#000', // Sombra ligera
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textArea: {
    height: 120, // Más alto para las notas
    textAlignVertical: 'top', // Alineación del texto dentro del área
  },
  button: {
    backgroundColor: '#388E3C', // Un verde oscuro y fuerte para el botón
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  botonCancelar: {
    marginTop: 30,
    backgroundColor: '#ff534a',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoBtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
