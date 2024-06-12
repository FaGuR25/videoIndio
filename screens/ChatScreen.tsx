import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import AddMedice from './AddMedice';
import {StatusBar} from 'react-native';

export default function ChatScreen(props) {
  return (
    <View>
      <AddMedice
        onPress={() => console.log('button')}
        imageStyle={styles.image}
        source={require('../assets/icons/logome.png')}
        text="press me"
      />
    </View>

    /*  <ScrollView>
      <View>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => props.navigation.navigate('CreateNotes')}>
          <Text style={styles.textoBoton}>Agregar Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => props.navigation.navigate('AddMedice')}>
          <Text style={styles.textoBoton}>Agregar Medicina</Text>
        </TouchableOpacity>
      </View>
    </ScrollView> */
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#019915',
    borderColor: '#019915',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 17,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
