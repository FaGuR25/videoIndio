import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const FindScreen = ({ navigation }) => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = () => {
    fetch(`http://localhost:3100/Citas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Citas:', data);  // Log para verificar los datos recibidos
        if (Array.isArray(data)) {
          setCitas(data);
        } else {
          console.error('Error: Response is not an array');
          setCitas([]);
        }
      })
      .catch(error => console.error('Error fetching citas:', error));
  };

  const renderItem = ({ item }) => {
    const { fecha, tiempo, documentos } = item;

    if (!fecha || !tiempo || !documentos) {
      return null;
    }

    return (
      <View style={styles.citaItem}>
        <Text style={styles.citaText}>Fecha: {fecha}</Text>
        <Text style={styles.citaText}>Hora: {tiempo}</Text>
        <Text style={styles.citaText}>Notas: {documentos}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>CALENDARIO</Text>
      <Calendar
        markedDates={{}}
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
        renderHeader={(date) => {
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
      
      <View style={styles.selectedDateContainer}>
        {citas.length > 0 ? (
          <FlatList
            data={citas}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.noCitasText}>No hay citas disponibles.</Text>
        )}
      </View>
    </View>
  );
};

export default FindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
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
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Asegura que la lista use todo el ancho disponible
  },
  citaItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
    width: '90%', // Ajusta el ancho de los elementos de la lista
  },
  citaText: {
    fontSize: 16,
  },
  noCitasText: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});
