import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Icon} from 'react-native-elements';

const FindScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [cites, setCites] = useState<Cita[]>([]);

  const handleDatePress = (day: any) => {
    setSelectedDate(day.dateString);
  };
  interface Cita {
    id_citas: number;
    fecha: Date;
    tiempo: number;
    documentos: String;
  }

  // custom alert
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCitaId, setSelectedCitaId] = useState(null); // Nuevo estado para almacenar id_notas

  const CustomAlertCita = ({visible, onConfirm, onCancel}: MyComponents) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onCancel}>
        <View style={styles.modalBackground}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>Eliminar Nota</Text>
            <Text style={styles.alertMessage}>
              ¿Estás seguro de que deseas eliminar esta Nota?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}>
                {/* {onCancelDelete}> */}
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => onConfirm()}>
                <Text style={styles.confirmButtonText}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchCites();
    }, []),
  );

  useEffect(() => {
    if (selectedDate !== '') {
      // Actualizar citas cuando se selecciona una nueva fecha
      fetchCites();
    }
    //Actualiza citas cuando se agrega una nueva
  }, [selectedDate]);

  useEffect(() => {
    // Actualizar citas cuando se inicializa
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: string = String(today.getMonth() + 1).padStart(2, '0'); // Ajustar para que el mes tenga 2 dígitos
    const day: string = String(today.getDate()).padStart(2, '0'); // Ajustar para que el día tenga 2 dígitos

    const DiaCreado: string = `${year}-${month}-${day}`;
    setSelectedDate(DiaCreado);
  }, []);

  const fetchCitesForDate = (date: any) => {
    fetch(`http://localhost:3100/Citas?fecha=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCites(data))
      .catch(error => console.error('Error fetching citas:', error));
  };

  /*  fetch de GetNotes */
  //===================================================
  const fetchCites = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Citas', requestOptions)
      .then(response => response.json())
      .then(result => setCites(result))
      .catch(error => console.error(error));
  };
  //===========================================================

  /* fetch de DeleteNote */
  //===========================================================

  const handleDeleteCitas = (id_citas: number) => {
    setSelectedCitaId(id_citas); // Guardar el id de la nota seleccionada
    setModalVisible(true);
    //console.log('Modal id:', id_citas);
  };

  const onConfirmDeleteCitas = () => {
    if (selectedCitaId !== null) {
      setModalVisible(false);
      //console.log('Nota id:', selectedCitaId);
      // Logica para eliminar la nota
      handleDeleteCita(selectedCitaId);
      // console.log('Nota eliminada');
    }
  };

  const onCancelDeleteCitas = () => {
    setModalVisible(false);
    console.log('Eliminación cancelada');
  };

  const handleDeleteCita = (id: number) => {
    const requestOptions = {
      method: 'DELETE',
      body: '',
      redirect: 'follow',
    };

    fetch(`http://localhost:3100/Citas/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetchCites();
      })
      .catch(error => console.error(error));
    // console.log('hola');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>CALENDARIO</Text>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: '#8fcbbc'},
        }}
        style={styles.calendar}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          monthTextColor: '#2d4150',
          arrowColor: 'orange',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 16,
        }}
        renderHeader={(date: any) => {
          const header = date.toString('MMMM yyyy');
          const [month, year] = header.split(' ');
          return (
            <View style={styles.headerContainer}>
              <Text style={styles.headerMonth}>{month}</Text>
              <Text style={styles.headerYear}>{year}</Text>
            </View>
          );
        }}
      />

      <ScrollView>
        {selectedDate !== '' && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>Fecha seleccionada:</Text>
            <Text style={styles.selectedDate}>{selectedDate}</Text>
          </View>
        )}
        <FlatList
          data={cites}
          keyExtractor={item =>
            item.id_citas ? item.id_citas.toString() : Math.random().toString()
          }
          scrollEnabled={false}
          renderItem={({item}) => (
            <>
              <View style={styles.noteCard}>
                <Text style={styles.diseño}>Cita</Text>
                <Text style={styles.diseño}>{item.fecha}</Text>
                <Text style={styles.noteContent}>{item.tiempo}</Text>
                <Text style={styles.noteContent}>{item.documentos}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteCitas(item.id_citas)}>
                  <Icon type="MaterialIcons" name="delete" />
                  <CustomAlertCita
                    visible={isModalVisible}
                    onConfirm={onConfirmDeleteCitas}
                    onCancel={onCancelDeleteCitas}
                  />
                </Pressable>
              </View>
              <View style={styles.divider} />
            </>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  calendar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerMonth: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerYear: {
    fontSize: 20,
  },
  selectedDateContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectedDate: {
    fontSize: 16,
    color: '#8fcbbc',
  },
  noteCard: {
    // backgroundColor: '#f9f9f9',
    backgroundColor: 'rgba(240, 245, 233, 1)',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  diseño: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 14,
    color: '#555',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333', // Color del título
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555', // Color del mensaje
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336', // Color del botón de cancelar
  },
  confirmButton: {
    backgroundColor: '#4CAF50', // Color del botón de confirmación
  },
  cancelButtonText: {
    color: '#fff', // Color del texto de cancelar
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff', // Color del texto de confirmación
    fontSize: 16,
  },
});

export default FindScreen;
