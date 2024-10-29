import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const topValues = Array.from({length: 40}, (_, index) => index * 5); // Cambia 40 por la cantidad de líneas que necesites

function Login({navigation}: {navigation: any}): React.JSX.Element {
  const logoRef = useRef(null);

  // useEffect(() => {
  //   if (logoRef.current) {
  //     // Restablece la escala y opacidad del logo al montarse el componente
  //     logoRef.current.setNativeProps({ style: { opacity: 1, transform: [{ scale: 1 }] } });
  //   }
  // }, []);

  const btnIngresarOnPress = () => {
    if (logoRef.current) {
      // Animación de escala y opacidad con un pequeño rebote inicial
      logoRef.current
        .animate(
          {
            0: {scale: 1, opacity: 1},
            0.3: {scale: 1.2}, // Pequeño rebote inicial
            1: {scale: 15, opacity: 0}, // Escala grande con desaparición gradual
          },
          1000,
        )
        .then(() => {
          navigation.navigate('Tabs'); // Navega a la pantalla de inicio
        });
    }
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
          <Animatable.View
            ref={logoRef}
            style={styles.logoContainer}
            useNativeDriver>
            <Image
              source={require('../assets/icons/logome.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animatable.View>
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Ohyou',
    // fontFamily: 'yow-font',
    // fontFamily: 'Cochin',
  },
  IngresarButton: {
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
