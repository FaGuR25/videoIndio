import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

const FindScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [cites, setCites] = useState<Cita[]>([]);

  const handleDatePress = day => {
    setSelectedDate(day.dateString);
  };

  interface Cita {
    id_citas: number;
    fecha: Date;
    tiempo: number;
    documentos: String;
  }

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
    //fetchCitesForDate(selectedDate);
    //fetchCites();
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

  const fetchCitesForDate = date => {
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
  //=============Mantenimiento======================================
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
        renderHeader={date => {
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
          renderItem={({item}) => (
            <View style={styles.noteCard}>
              <Text style={styles.diseño}>Cita</Text>
              <Text style={styles.diseño}>{item.fecha}</Text>
              <Text style={styles.noteContent}>{item.tiempo}</Text>
              <Text style={styles.noteContent}>{item.documentos}</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => handleDeleteCita(item.id_citas)}>
                <Text>X</Text>
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#f9f9f9',
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
});

export default FindScreen;
