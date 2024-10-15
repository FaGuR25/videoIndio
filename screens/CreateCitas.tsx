import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

export default function CreateCitas({navigation}: {navigation: any}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [items, setItems] = useState(['']);

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
        scheduleNotification(fecha, tiempo, documentos); // notificación
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'No se pudo guardar la cita.');
      });
  };

  const scheduleNotification = (fecha, tiempo, documentos) => {
    const notificationDate = new Date(date);

    PushNotification.localNotificationSchedule({
      channelId: 'fatima1', // (required for Android)
      title: `Recordatorio: Tienes una cita`, // (optional)
      message: `No olvides llevar: ${documentos}`, // (required)
      date: notificationDate, // Fecha y hora de la notificación
      allowWhileIdle: true, // Permite notificaciones cuando el dispositivo está inactivo
    });
  };

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>

        <View style={styles.datePicker}>
          <Text>Fecha de la cita</Text>
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
          <Text>Hora del recordatorio</Text>
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

        <Text style={styles.textLlevar}>¿Qué llevar?</Text>
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textoInput: {
    borderColor: '#cccccc',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  textLlevar: {
    color: 'black',
    marginTop: 20,
    marginLeft: 140,
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
