import {Image, Pressable, Text, StyleSheet} from 'react-native';

export default function AddMedice({onPress, source, imageStyle, text}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => {
        return [styles.row, pressed ? styles.row : styles.notPressed];
      }}>
      <Image style={imageStyle} source={source} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0,
  },
  notPressed: {
    opacity: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 16,
  },
});

/* import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TextInput, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
    fontSize: 20,
  },
  botonEnviar: {
    backgroundColor: '#019915',
    borderColor: '#019915',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 220,
    marginTop: 250,
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
  textgramos: {},
});
 */
