import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ChatScreen(props): React.JSX.Element {
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => props.navigation.navigate('CreateNotes')}>
          <Text style={styles.textoBoton}>Agregar una nueva nota</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#b71375',
    borderColor: '#fc4f00',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
