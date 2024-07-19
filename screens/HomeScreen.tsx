import React, {useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ImageButton from './ImageButton';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import {FAB} from 'react-native-paper';

const {width} = Dimensions.get('window');

export default function HomeScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
    }, []),
  );

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

        <View style={styles.container}>
          <Image source={require('./img/salud.png')} style={styles.imagen} />
          <Text style={styles.texto}>
            Todavía no hay ningún recordatorio. ¡Pulsa "+" para agregar uno!
          </Text>
        </View>

        <FAB style={styles.fab} onPress={() => setModalVisible(true)} />
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
                props.navigation.navigate('CreateNotes');
              }}
              imageStyle={styles.image}
              source={require('../assets/icons/notas.png')}
              text="Notas"
            />
            <ImageButton
              onPress={() => {
                setModalVisible(false);
                props.navigation.navigate('AddMedice');
              }}
              imageStyle={styles.imagemed}
              source={require('../assets/icons/medi.png')}
              text="Medicamentos"
            />
            <ImageButton
              onPress={() => {
                setModalVisible(false);
                props.navigation.navigate('CreateNotes');
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
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
  imagen: {
    width: 100,
    height: 100,
    marginTop: 1,
  },
  texto: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007307',
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
    zIndex: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    elevation: 10,
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
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
