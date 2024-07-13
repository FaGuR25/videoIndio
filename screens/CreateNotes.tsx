import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import ChatScreen from './screens/ChatScreen';

export default function CreateNotes(props) {
  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <View style={styles.contenedor}></View>
        <TextInput
          placeholder="Ingresa el titulo"
          style={styles.textoInputTitle}
        />
        <Pressable
          style={styles.closeButton}
          onPress={() => props.navigation.navigate('ChatScreen')}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
        <TextInput
          placeholder="Ingresa la nota"
          multiline={true}
          numberOfLines={4}
          style={styles.textoInput}
        />
        <View>
          <TouchableOpacity style={styles.botonEnviar}>
            <Text style={styles.textoBtnEnviar}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonCancelar}>
            <Text style={styles.textoBtnEnviar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPadre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: '#d4fed3',
    borderRadius: 20,
    width: '95%',
    height: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contenedor: {
    padding: 20,
  },
  textoInputTitle: {
    borderColor: '#d4fed3',
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 22,
  },
  textoInput: {
    borderColor: '#d4fed3',
    borderRadius: 8,
    marginBottom: 200,
    fontSize: 20,
    height: '40%',
  },
  botonEnviar: {
    backgroundColor: '#019915',
    borderColor: '#019915',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 220,
  },
  botonCancelar: {
    backgroundColor: '#ff534a',
    borderColor: '#ff534a',
    borderWidth: 3,
    borderRadius: 20,
    marginRight: 220,
  },
  textoBtnEnviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
