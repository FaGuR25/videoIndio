import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>John Doe</Text>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('Edits')}
            accessibilityLabel="Edit Name">
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Correo</Text>
          <Text style={styles.infoValue}>john.doe@example.com</Text>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('EditEmail')}
            accessibilityLabel="Edit Email">
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contraseña</Text>
          <Text style={styles.infoValue}>••••••••</Text>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('EditPassword')}
            accessibilityLabel="Edit Password">
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  editText: {
    fontSize: 16,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  infoLabel: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: 'gray',
  },
  infoValue: {
    flex: 2,
    fontSize: 16,
    color: 'black',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f28b82',
    padding: 15,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
