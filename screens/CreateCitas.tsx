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

export default function CreateCitas({navigation}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [items, setItems] = useState(['cartilla', 'acta']);

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
    const cita = {
      fecha: date.toISOString().split('T')[0],
      tiempo: date.toTimeString().split(' ')[0],
      documentos: items.join(', '),
    };

    fetch('http://localhost:3100/Citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cita),
    })
      .then(response => response.json())
      .then(result => {
        Alert.alert('Cita guardada');
        navigation.goBack(); // Regresa al calendario
      })
      .catch(error => console.error('Error saving cita:', error));
  };

  //desde aqui empieza lo de las notificaciones

  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  testPush = () => {
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };

  //aqui termina lo de notificaciones

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <Pressable
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
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
    marginTop: 100,
  },
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
    marginTop: 40,
    fontWeight: 'bold',
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  reminderSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textoInput: {
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
