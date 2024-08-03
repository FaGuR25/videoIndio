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
