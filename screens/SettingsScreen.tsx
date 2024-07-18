import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
  });

  const fetchUserData = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:3100/Guardar/', requestOptions)
      .then(response => response.json())
      .then(result => {
        const a = result?.length ?? 0;

        console.log(result[a - 1]);
        setUserData(result[a - 1]);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchUserData();
    const unsubscribe = navigation.addListener('focus', fetchUserData);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (route.params?.updated) {
      fetchUserData();
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Setting</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{userData.nombre}</Text>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('Edits')}
            accessibilityLabel="Edit Name">
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Correo</Text>
          <Text style={styles.infoValue}>{userData.correo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Contraseña</Text>
          <Text style={styles.infoValue}>••••••••</Text>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fcbbc',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
});
