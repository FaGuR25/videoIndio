import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const FindScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Calendar
        // Configuración del calendario
        // Por ejemplo, puedes definir propiedades como markedDates, minDate, maxDate, etc.
        style={styles.calendar}
      />
    </View>
  );
};

export default FindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 300,
    width: '90%',
    marginTop: 20,
  },
});
