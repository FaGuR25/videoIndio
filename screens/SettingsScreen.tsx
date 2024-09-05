import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-elements';

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <TouchableOpacity>
          <AntDesign style={{fontSize: 40}} name="arrowleft" />
        </TouchableOpacity>

        <Text>Mi perfil</Text>
      </View>

      <View style={{marginTop: 30, alignItems: 'center'}}>
        <Image
          style={styles.avatar}
          source={require('../assets/icons/profile.png')}
        />
        <Text style={styles.userName}>Alex Morelos Patin</Text>
        <Text> akljfkjlaa@gmail.com</Text>
      </View>
      <Button onPress={() => navigation.goBack()} style={styles.btn}>
        <Text style={styles.textBtn}>Cerrar Sesion</Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  btn: {
    width: 100,
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 30,
    marginTop: 40,
  },
  textBtn: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SettingsScreen;

/* import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  useColorScheme,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const SettingsScreen = () => {
  const {colorScheme, toogleColorScheme} = useColorScheme();
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
    <View style={{backgroundColor:text-white}}>
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
      <Text> Modo Oscuro</Text>
      <Switch value={colorScheme == 'dark'} onChange={toogleColorScheme} />
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
 */
