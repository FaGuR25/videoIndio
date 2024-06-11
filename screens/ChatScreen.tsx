import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ChatScreen(props) {
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => props.navigation.navigate('CreateNotes')}>
          <Text style={styles.textoBoton}>Agregar Nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
});
