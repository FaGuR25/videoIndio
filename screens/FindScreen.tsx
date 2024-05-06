import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
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
