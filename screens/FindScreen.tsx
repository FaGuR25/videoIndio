/*import React from 'react';
import {StyleSheet, View} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

export default function App() {
  const sampleEvents = [
    {start: '2020-03-23 09:00:00', duration: '00:20:00', note: 'Walk my dog'},
    {
      start: '2024-03-24 14:00:00',
      duration: '01:00:00',
      note: "Doctor's appointment",
    },
    {
      start: '2020-03-25 08:00:00',
      duration: '00:30:00',
      note: 'Morning exercise',
    },
    {
      start: '2020-03-25 14:00:00',
      duration: '02:00:00',
      note: 'Meeting with client',
    },
    {
      start: '2020-03-25 19:00:00',
      duration: '01:00:00',
      note: 'Dinner with family',
    },
    {start: '2024-03-24 09:30:00', duration: '01:00:00', note: 'Schedule 1'},
    {start: '2020-03-26 11:00:00', duration: '02:00:00', note: 'Schedule 2'},
    {start: '2020-03-26 15:00:00', duration: '01:30:00', note: 'Schedule 3'},
    {start: '2020-03-26 18:00:00', duration: '02:00:00', note: 'Schedule 4'},
    {start: '2020-03-26 22:00:00', duration: '01:00:00', note: 'Schedule 5'},
  ];

  return (
    <View style={styles.container}>
      <WeeklyCalendar events={sampleEvents} style={{height: 400}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const FindScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDatePress = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: '#8fcbbc'},
        }}
        style={styles.calendar}
      />
      {selectedDate !== '' && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>Fecha seleccionada:</Text>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
        </View>
      )}
    </View>
  );
};

export default FindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  calendar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
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
  addButton: {
    backgroundColor: '#8fcbbc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
});
 
