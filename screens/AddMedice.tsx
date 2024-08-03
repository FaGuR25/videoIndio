import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ImageButton from './ImageButton';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateNotes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

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
            onPress={() => setModalVisible(true)}
            imageStyle={styles.image}
            source={require('../assets/icons/reloj1.png')}
            text="Horario"
          />
        </View>
        <View style={styles.recordatorio}>
          <ImageButton
            onPress={() => setModalVisible(true)}
            imageStyle={styles.imageRecord}
            source={require('../assets/icons/desli.png')}
            text="Recordatorio"
          />
        </View>

        {/* MODAL */}
        <View style={styles.conteinerModel}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalHeader}>HORARIO</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
                <Pressable style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>GUARDAR</Text>
                </Pressable>
                <Text style={styles.modalSubHeader}>TOMAR</Text>
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="time"
                    display="spinner"
                    onChange={onChange}
                  />
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowPicker(true)}>
                  <Text style={styles.textStyle}>Show Picker</Text>
                </Pressable>
                <Text style={styles.modalSubHeader}>DIAS</Text>
                <View style={styles.daysContainer}>
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                    <TouchableOpacity key={index} style={styles.dayButton}>
                      <Text style={styles.dayButtonText}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* FIN DE MODAL */}

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
    position: 'absolute',
    width: 200,
    height: 100,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#004d40',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalSubHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dayButton: {
    backgroundColor: '#004d40',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
