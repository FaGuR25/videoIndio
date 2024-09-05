import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
  TouchableOpacity,
  Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

export default function CreateCitas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [items, setItems] = useState(['cartilla', 'acta']);
  const [dias, setTime] = useState([]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  const handleSave = () => {
    const fecha = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const tiempo = date.toTimeString().split(' ')[0]; // Formato HH:MM:SS
    const documentos = items.join(', ');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      fecha,
      tiempo,
      documentos,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Citas', requestOptions)
      .then(response => response.json())
      .then(result => {
        Alert.alert('Éxito', 'Cita guardada exitosamente.');
        setModalVisible(false);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'No se pudo guardar la cita.');
      });

  //   PushNotification.localNotificationSchedule({
  //     channelId: 'fatima1', // (required for Android)
  //     title: `Recordatorio: Tienes una cita`, // (optional)
  //     message: `Es hora de tomar ${documentos}`, // (required)
  //     date: notificationDate,
  //     repeatType: 'week', // Repite cada semana en el mismo día
  //     allowWhileIdle: true,
  //   });
   };

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
        <View style={styles.datePicker}>
          <Text>Fecha</Text>
          <Pressable onPress={() => setShowDatePicker(true)}>
            <Text>{date.toDateString()}</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
        <View style={styles.timePicker}>
          <Text>Horario</Text>
          <Pressable onPress={() => setShowTimePicker(true)}>
            <Text>{date.toLocaleTimeString()}</Text>
          </Pressable>
          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>
        <View style={styles.reminderSwitch}>
          <Text>Recordatorio</Text>
          <Switch onValueChange={setReminder} value={reminder} />
        </View>
        <Text style={styles.textLLevar}>LLevar</Text>
        <TextInput
          placeholder="Agregar elementos"
          multiline={true}
          numberOfLines={4}
          style={styles.textoInput}
          value={items.join('\n')}
          onChangeText={text => setItems(text.split('\n'))}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLLevar: {
    color: 'black',
    marginTop: 100,
  },
  contenedorPadre: {
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    color: 'black',
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
  closeButton: {
    color: 'black',

    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'black',

    fontSize: 20,
    fontWeight: 'bold',
  },
  datePicker: {
    color: 'black',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 40,
    fontWeight: 'bold',
  },
  timePicker: {
    color: 'black',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  reminderSwitch: {
    color: 'black',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textoInput: {
    color: 'black',

    borderColor: '#d4fed3',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
