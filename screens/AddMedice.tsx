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

export default function AddMedice({navigation}: {navigation: any}) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [nombreMedicamento, setNombreMedicamento] = useState('');
  const [gramos, setGramos] = useState('');
  const [dias, setDias] = useState([]);

  const onChange = ({selectedDate}: {selectedDate: any}) => {
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

    // const raw = JSON.stringify({
    //   nombreMedicamento,
    //   gramos,
    //   tiempo: date.toTimeString().split(' ')[0],
    //   dias,
    // });

    const raw = JSON.stringify({
      nombreMedicamento,
      gramos,
      tiempo: date.toTimeString().split(' ')[0],
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
            playSound: true, // Habilita el sonido
            soundName: 'default', // Usa el sonido predeterminado
            vibrate: true, // Habilita la vibración
            vibration: 1000, // Duración de la vibración en milisegundos (opcional)
          });
        });
        Alert.alert(
          'Éxito',
          'Medicamento guardado y notificación programada exitosamente.',
        );
        navigation.navigate('Inicio'); // Navega a la pantalla de inicio
      })
      .catch(error => console.error(error));
  };

  const handleGramosChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, ''); // Permite solo números
    setGramos(numericText.slice(0, caractGramMed));
  };

  const caractNombMed = 40;
  const caractGramMed = 6;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenedorPadre}>
        <View style={styles.tarjeta}>
          <Text style={styles.NameMedice}>Nombre del Medicamento</Text>
          <TextInput
            placeholder="Nombre del Medicamento"
            style={styles.textoInputTitle}
            numberOfLines={3}
            value={nombreMedicamento}
            onChangeText={text =>
              setNombreMedicamento(text.slice(0, caractNombMed))
            }
          />
          <Text
            style={
              styles.textLimit
            }>{`${nombreMedicamento.length}/${caractNombMed} caracteres`}</Text>
          <Text style={styles.NameMedice}>Gramos</Text>
          <TextInput
            placeholder="Gramos"
            multiline={true}
            style={styles.textoInput}
            value={gramos}
            onChangeText={handleGramosChange}
            keyboardType="numeric"
          />
          <Text
            style={
              styles.textLimit
            }>{`${gramos.length}/${caractGramMed} caracteres`}</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8F7', // Un verde claro suave de fondo
  },
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
    backgroundColor: '#F0F8F7',
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
    backgroundColor: '#077187',
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
    backgroundColor: '#077187',
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
/* 
import {
  SafeAreaView,
  StyleSheet,
  View,
  //TextInput,
  //Button,
  Text,
  //Alert,
  Image,
  Touchable,
  //Pressable,
} from 'react-native';
import React from 'react';
//import HomeScreen from './HomeScreen';
//import PushNotification from 'react-native-push-notification';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

const topValues = Array.from({length: 40}, (_, index) => index * 5); // Cambia 40 por la cantidad de líneas que necesites

function Login({navigation}: {navigation: any}): React.JSX.Element {
  const btnIngresarOnPress = function () {
    navigation.navigate('Tabs');
    return;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <View style={styles.diagonalLinesContainer}>
          {topValues.map((value, index) => (
            <View
              key={index}
              style={[styles.diagonalLine, {top: `${value}%`}]}
            />
          ))}
        </View>

        <View style={styles.container}>
          <Image
            source={require('../assets/icons/logome.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Animatable.Text
            animation="fadeIn"
            duration={2000}
            style={styles.TextoPrincipal}>
            Agenda Salud
          </Animatable.Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.IngresarButton}
            onPress={btnIngresarOnPress}>
            <Text style={styles.IngresarButtonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    /* <TouchableOpacity
        onPress={() => {
          PushNotification.localNotificationSchedule({
            channelId: 'fatima1', // (required for Android)
            title: 'medicamentos 15 segundos', // (optional)
            message: 'tomate los medicamentos', // (required)
            date: new Date(Date.now() + 15 * 1000),
            allowWhileIdle: true,
          });
        }}>
        <Text>boton</Text>
      </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  screen: {
    height: '100%',
    backgroundColor: '#e0f2f1',
    justifyContent: 'center',
    alignContent: 'center',
  },
  diagonalLinesContainer: {
    position: 'absolute',
    top: 0,
    left: -300,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  diagonalLine: {
    position: 'absolute',
    width: '300%',
    height: 3,
    backgroundColor: '#b2dfdb',
    transform: [{rotate: '45deg'}],
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  TextInput: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '80%',
    margin: 8,
    borderColor: '#80cbc4',
  },
  buttonContainer: {
    backgroundColor: '#00796b',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 130,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#004d40',
    marginBottom: 20,
  },
  TextoPrincipal: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'Autumn_Children.ttf',
  },
  IngresarButton: {
    //backgroundColor: '#004d40',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  IngresarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default Login;
 */
