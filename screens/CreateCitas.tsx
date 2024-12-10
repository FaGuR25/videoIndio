import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

export default function CreateCitas({navigation}: {navigation: any}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [items, setItems] = useState('');

  const formatDateToSpanish = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTimeToSpanish = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
    const fecha = date.toISOString().split('T')[0];
    const tiempo = date.toTimeString().split(' ')[0];
    const documentos = items;

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
        scheduleNotification(fecha, tiempo, documentos);
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
      channelId: 'fatima1',
      title: `Recordatorio: Tienes una cita`,
      message: `No olvides llevar: ${documentos}`,
      date: notificationDate,
      allowWhileIdle: true,
    });
  };

  const caractElement = 150;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cita</Text>
      <TouchableOpacity
        style={[styles.input, styles.buttonInput]}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonInputText}>
          {`Fecha de la cita: ${formatDateToSpanish(
            date,
          )}                       Presióname`}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <TouchableOpacity
        style={[styles.input, styles.buttonInput]}
        onPress={() => setShowTimePicker(true)}>
        <Text style={styles.buttonInputText}>
          {`Hora del recordatorio: ${formatTimeToSpanish(
            date,
          )}                        Presióname`}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Agregar elementos"
        value={items}
        onChangeText={text => setItems(text.slice(0, caractElement))}
        placeholderTextColor="#A9A9A9"
        multiline
      />
      <Text style={styles.charCount}>
        {`${items.length}/${caractElement} caracteres`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cita</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8F7',
  },
  input: {
    height: 50,
    borderColor: '#66BB6A',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonInput: {
    justifyContent: 'center',
  },
  buttonInputText: {
    color: '#388E3C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#388E3C',
    textAlign: 'right',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#388E3C',
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
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#ff534a',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
