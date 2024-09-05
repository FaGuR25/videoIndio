import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

export default function AddMedice({navigation}) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [nombreMedicamento, setNombreMedicamento] = useState('');
  const [gramos, setGramos] = useState('');
  const [dias, setDias] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSave = () => {
    if (nombreMedicamento === '' || gramos === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      nombreMedicamento,
      gramos,
      tiempo: date.toTimeString().split(' ')[0],
      dias,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Medicamentos', requestOptions)
      .then(response => response.json())
      .then(result => {
        // Configuración de la notificación
        dias.forEach(day => {
          const notificationDate = new Date(date);
          notificationDate.setDate(
            notificationDate.getDate() +
              ((day - notificationDate.getDay() + 7) % 7),
          );

          PushNotification.localNotificationSchedule({
            channelId: 'fatima1', // (required for Android)
            title: `Recordatorio: ${nombreMedicamento}`, // (optional)
            message: `Es hora de tomar ${nombreMedicamento} (${gramos})`, // (required)
            date: notificationDate,
            repeatType: 'week', // Repite cada semana en el mismo día
            allowWhileIdle: true,
          });
        });

        Alert.alert(
          'Éxito',
          'Medicamento guardado y notificación programada exitosamente.',
        );
        navigation.navigate('HomeScreen'); // Navega a la pantalla de inicio
      })
      .catch(error => console.error(error));
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <Text style={styles.NameMedice}>Nombre del Medicamento</Text>
        <TextInput
          placeholder="Nombre del Medicamento"
          style={styles.textoInputTitle}
          numberOfLines={3}
          value={nombreMedicamento}
          onChangeText={setNombreMedicamento}
        />
        <Text style={styles.textLimit}>0/250</Text>

        <Text style={styles.NameMedice}>Gramos</Text>
        <TextInput
          placeholder="Gramos"
          multiline={true}
          style={styles.textoInput}
          value={gramos}
          onChangeText={setGramos}
        />
        <Text style={styles.textLimit}>0/50</Text>

        <Text style={styles.modalHeader}>Horario</Text>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="spinner"
            onChange={onChange}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowPicker(true)}>
          <Text style={styles.buttonText}>Agregar Hora</Text>
        </TouchableOpacity>

        <Text style={styles.modalHeader}>Días</Text>
        <View style={styles.daysContainer}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                dias.includes(index + 1) && {backgroundColor: '#01780d'},
              ]}
              onPress={() => {
                setDias(prev =>
                  prev.includes(index + 1)
                    ? prev.filter(d => d !== index + 1)
                    : [...prev, index + 1],
                );
              }}>
              <Text style={styles.dayButtonText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.botonEnviar} onPress={handleSave}>
            <Text style={styles.textoBtn}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonCancelar}
            onPress={() => navigation.goBack()}>
            <Text style={styles.textoBtn}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  botonRecordatorio: {
    color: '#333',
  },
  NameMedice: {
    color: '#333',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  contenedorPadre: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textoInputTitle: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  textoInput: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  textLimit: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    fontSize: 12,
    color: '#666',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#4682b4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dayButton: {
    backgroundColor: '#4682b4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  dayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  botonEnviar: {
    backgroundColor: '#019915',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  botonCancelar: {
    backgroundColor: '#ff534a',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textoBtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
