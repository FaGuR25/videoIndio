import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TextInput, Image, Alert, Modal, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImageButton from './ImageButton';

export default function CreateNotes() {
  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <View style={styles.contenedor}></View>
        <TextInput
          placeholder="Nombre del Medicamento"
          style={styles.textoInputTitle}
        />
        <Text> 0/250</Text>
        <TextInput
          placeholder="Gramos"
          multiline={true}
          numberOfLines={4}
          style={styles.textoInput}
        />
        <Text style={styles.textgramos}> 0/50</Text>
        <View style={styles.horario}>
          <ImageButton
            onPress={() => console.log('button')}
            imageStyle={styles.image}
            source={require('../assets/icons/reloj1.png')}
            text="Horario"
          />
        </View>
        <View style={styles.recordatorio}>
          <ImageButton
            onPress={() => console.log('button')}
            imageStyle={styles.imageRecord}
            source={require('../assets/icons/desli.png')}
            text="Recordatorio"
          />
        </View>
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
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 22,
  },
  textoInput: {
    borderColor: '#d4fed3',
    borderRadius: 8,
    fontSize: 20,
  },
  botonEnviar: {
    backgroundColor: '#019915',
    borderColor: '#019915',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 220,
    marginTop: 120,
    
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
  textgramos: {
    marginBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 160,
    marginTop: 5,
  },
  imageRecord: {
    width: 75,
    height: 50,
    marginRight: 115,
    marginTop: 5,
  },
  horario: {
    backgroundColor: '#019915',
    borderRadius: 30,
    paddingBottom: 5,
    paddingRight: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  recordatorio: {
    backgroundColor: '#019915',
    borderRadius: 30,
    paddingBottom: 5,
    paddingRight: 5,
    marginTop: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
});
