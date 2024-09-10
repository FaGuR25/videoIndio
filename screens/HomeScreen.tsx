import React, {useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  Modal,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ImageButton from './ImageButton';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import {FAB} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

interface Note {
  id_notas: number;
  titulo: String;
  notas: String;
}

interface Medicamentos {
  id_medicamento: number;
  nombreMedicamento: String;
  gramos: number;
  tiempo: number;
  dias: number;
}

export default function HomeScreen({navigation}: {navigation: any}) {
  const [modalVisible, setModalVisible] = useState(false);
  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [medice, setMedice] = useState<Medicamentos[]>([]);
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
      fetchNotes();
      fetchMedice();
    }, []),
  );

  /*  fetch de GetNotes */
  //===========================================================
  const fetchNotes = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Notas', requestOptions)
      .then(response => response.json())
      .then(result => setNotes(result))
      .catch(error => console.error(error));
  };
  //===========================================================

  /* fetch de GetMedice */
  //===========================================================
  const fetchMedice = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://localhost:3100/Medicamentos', requestOptions)
      .then(response => response.json())
      .then(result => setMedice(result))
      .catch(error => console.error(error));
  };
  //===========================================================

  /* fetch de DeleteNote */
  //===========================================================

  const handleDeleteNote = (id: number) => {
    const requestOptions = {
      method: 'DELETE',
      // headers: myHeaders,
      body: '',
      redirect: 'follow',
    };

    fetch(`http://localhost:3100/Notas/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetchNotes();
      })
      .catch(error => console.error(error));
    // console.log('hola');
  };

  //===========================================================

  /* fetch de DeleteMedice */
  //===========================================================
  const handleDeleteMedicamento = (id: number) => {
    const requestOptions = {
      method: 'DELETE',
      // headers: myHeaders,
      body: '',
      redirect: 'follow',
    };

    fetch(`http://localhost:3100/Medicamentos/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetchMedice();
      })
      .catch(error => console.error(error));
    // console.log('hola');
  };
  //===========================================================

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({length: 7}).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#01780d',
                            borderColor: '#01780d',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && {color: '#fff'},
                          ]}>
                          {item.weekday === 'Mon' && 'Lun'}
                          {item.weekday === 'Tue' && 'Mar'}
                          {item.weekday === 'Wed' && 'Mié'}
                          {item.weekday === 'Thu' && 'Jue'}
                          {item.weekday === 'Fri' && 'Vie'}
                          {item.weekday === 'Sat' && 'Sáb'}
                          {item.weekday === 'Sun' && 'Dom'}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && {color: '#fff'},
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <ScrollView style={styles.Scrollcito}>
          <FlatList
            data={notes}
            keyExtractor={item =>
              item.id_notas
                ? item.id_notas.toString()
                : Math.random().toString()
            }
            renderItem={({item}) => (
              <View style={styles.noteCard}>
                <Text style={styles.diseño}>Notas</Text>
                <Text style={styles.diseño}>{item.titulo}</Text>
                <Text style={styles.noteContent}>{item.notas}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteNote(item.id_notas)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
              </View>
            )}
          />
          <FlatList
            data={medice}
            keyExtractor={item =>
              item.id_medicamento
                ? item.id_medicamento.toString()
                : Math.random().toString()
            }
            renderItem={({item}) => (
              <View style={styles.noteCard}>
                <Text style={styles.diseño}>Medicamentos</Text>
                <Text style={styles.diseño}>{item.nombreMedicamento}</Text>
                <Text style={styles.noteContent}>{item.gramos} </Text>
                <Text style={styles.noteContent}>{item.tiempo}</Text>
                <Text style={styles.noteContent}>{item.dias}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteMedicamento(item.id_medicamento)}>
                  <Text style={styles.closeButtonText}>X</Text>
                </Pressable>
              </View>
            )}
          />
        </ScrollView>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        />
      </View>
      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ImageButton
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('CreateNotes');
              }}
              imageStyle={styles.image}
              source={require('../assets/icons/notas.png')}
              text="Notas"
            />
            <ImageButton
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddMedice');
              }}
              imageStyle={styles.imagemed}
              source={require('../assets/icons/medi.png')}
              text="Medicamentos"
            />
            <ImageButton
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('CreateCitas');
              }}
              imageStyle={styles.imagecite}
              source={require('../assets/icons/citas.png')}
              text="Citas"
            />
          </View>
        </View>
      </Modal>
      {/* modal */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Scrollcito: {
    marginTop: 80,
  },
  diseño: {
    color: '#333',
    fontSize: 18,
  },
  imagemed: {
    width: 55,
    height: 52,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 5,
    marginRight: 60,
    marginBottom: 20,
  },
  imagecite: {
    width: 70,
    height: 60,
    marginTop: 5,
    marginRight: 60,
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    position: 'absolute',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#0c0',
  },
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    marginTop: 50,
    paddingVertical: 16,
  },
  inputContainer: {
    paddingTop: 20,
  },
  navcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    marginVertical: 8,
  },
  footer: {
    backgroundColor: '#01780d',
    height: 70,
  },
  right: {
    marginLeft: 200,
  },
  itemCard: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
  },
  imageProfile: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginRight: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  datepicker: {
    width: '100%',
  },
  fab: {
    backgroundColor: '#01780d',
    position: 'absolute',
    color: '#fdfefc',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  noteCard: {
    color: '#333',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 16,
    color: '#333',
  },
});

/* import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (


    <View style={styles.container}>
      <Image source={require('./img/salud.png')} style={styles.imagen} />
      <Text style={styles.texto}>
        Todavía no hay ningún recordatorio. ¡Pulsa "+" para agregar uno!
      </Text>
    </View>
  );
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#8fcbbc',
        },
        headerTintColor: '#666666',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30,
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
  imagen: {
    width: 100,
    height: 100,
  },
  texto: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});
*/
