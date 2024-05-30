import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CreateNotes() {
  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <View style={styles.contenedor}></View>
        <TextInput placeholder="Ingresa el titulo" style={styles.textoInput} />
        <TextInput
          placeholder="Ingresa el detalle"
          multiline={true}
          numberOfLines={4}
          style={styles.textoInput}
        />
        <View>
          <TouchableOpacity style={styles.botonEnviar}>
            <Text style={styles.textoBtnEnviar}>Agregar una nueva nota</Text>
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
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
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
  textoInput: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 2,
    marginTop: 10,
    borderRadius: 8,
  },
  botonEnviar: {
    backgroundColor: '#b71375',
    borderColor: '#fc4f00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBtnEnviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
