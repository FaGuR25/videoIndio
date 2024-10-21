import React, {useState, useRef, useCallback} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import {Icon} from 'react-native-elements';
import medicamentos from '../assets/icons/medicamentos.png';
// import {Searchbar} from 'react-native-paper';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
//import ImageButton from './ImageButton';
import moment from 'moment';
import Swiper from 'react-native-swiper';
//import {FAB} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from 'react-native';

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

interface MyComponents {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// custom alert
const CustomAlertNotas = ({visible, onConfirm, onCancel}: MyComponents) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Eliminar Nota</Text>
          <Text style={styles.alertMessage}>
            ¿Estás seguro de que deseas eliminar esta Nota?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              {/* {onCancelDelete}> */}
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onConfirm()}>
              <Text style={styles.confirmButtonText}>Sí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// custom alert MEDICAMENTOS
const CustomAlertMedic = ({visible, onConfirm, onCancel}: MyComponents) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Eliminar Medicamento</Text>
          <Text style={styles.alertMessage}>
            ¿Estás seguro de que deseas eliminar este Medicamento?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              {/* {onCancelDelete}> */}
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onConfirm()}>
              <Text style={styles.confirmButtonText}>Sí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function HomeScreen({navigation}: {navigation: any}) {
  //const [modalVisible, setModalVisible] = useState(false);
  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [medice, setMedice] = useState<Medicamentos[]>([]);
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Nuevo estado para almacenar id_notas
  const [selectedMediId, setSelectedMediId] = useState(null); // Nuevo estado para almacenar id_notas

  //const [searchQuery, setSearchQuery] = React.useState('');

  useFocusEffect(
    useCallback(() => {
      //setModalVisible(false);
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
    setModalVisible(false);
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`http://localhost:3100/Notas/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetchNotes(); // Actualizar la lista de notas
      })
      .catch(error => console.error('Error al eliminar la nota:', error));
  };

  //===========================================================

  /* fetch de DeleteMedice */
  //===========================================================
  const handleDeleteMedi = (id: number) => {
    setModalVisible2(false);
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`http://localhost:3100/Medicamentos/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        fetchMedice(); // Actualizar la lista de medicamentos
      })
      // eslint-disable-next-line prettier/prettier
      .catch(error =>
        console.error('Error al eliminar el medicamento:', error),
      );
  };
  //===========================================================

  //===========================================================
  // Custom Aler

  const handleDeleteNotas = (id_notas: number) => {
    setSelectedNoteId(id_notas); // Guardar el id de la nota seleccionada
    setModalVisible(true);
    //console.log('Modal id:', id_notas);
  };

  const onConfirmDelete = () => {
    if (selectedNoteId !== null) {
      setModalVisible(false);
      //console.log('Nota id:', selectedNoteId);
      // Logica para eliminar la nota
      handleDeleteNote(selectedNoteId);
      // console.log('Nota eliminada');
    }
  };

  const onCancelDelete = () => {
    setModalVisible(false);
    console.log('Eliminación cancelada');
  };

  const handleDeleteMedicamento = (id_medi: number) => {
    setSelectedMediId(id_medi); // Guardar el id de la nota seleccionada
    setModalVisible2(true);
  };

  const onConfirmDeleteMedi = () => {
    setModalVisible2(false);
    // Lógica para eliminar la cita
    handleDeleteMedi(selectedMediId);
    console.log('Medicamento eliminado');
  };

  const onCancelDeleteMedi = () => {
    setModalVisible2(false);
    console.log('Eliminación cancelada');
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

  const actions = [
    {
      text: 'Crear Nota',
      icon: require('../assets/icons/notes.png'),
      name: 'Notes',
      position: 1,
    },
    {
      text: 'Agregar Medicamento',
      icon: require('../assets/icons/farmaco.png'),
      name: 'Medice',
      position: 2,
    },
    {
      text: 'Agregar Cita',
      icon: require('../assets/icons/cita-medica.png'),
      name: 'Cites',
      position: 3,
    },
  ];

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
          <View style={styles.mostrarCosas}>
            <Text style={styles.mostrarCosas}>Notas</Text>
          </View>

          <FlatList
            style={styles.FlatListNotes}
            data={notes}
            keyExtractor={item =>
              item.id_notas
                ? item.id_notas.toString()
                : Math.random().toString()
            }
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={styles.noteCardNotes}>
                {/* <Text style={styles.diseño}>Notas</Text> */}
                <Text style={styles.diseño}>{item.titulo}</Text>
                <Text style={styles.noteContent}>{item.notas}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteNotas(item.id_notas)}>
                  <Icon type="MaterialIcons" name="delete" />
                  <CustomAlertNotas
                    visible={isModalVisible}
                    onConfirm={onConfirmDelete}
                    onCancel={onCancelDelete}
                  />
                </Pressable>
              </View>
            )}
          />
          <View style={styles.containertext}>
            <Image source={medicamentos} style={styles.imagetext} />
            <Text style={styles.textWithBorder}>Medicamentos</Text>
            <Text style={styles.textWithBorder}>Medicamentos</Text>
          </View>

          <FlatList
            style={styles.FlatListMedicine}
            data={medice}
            keyExtractor={item =>
              item.id_medicamento
                ? item.id_medicamento.toString()
                : Math.random().toString()
            }
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={styles.noteCardMedicine}>
                {/* <Text style={styles.diseño}>Medicamentos</Text> */}
                <Text style={styles.diseño}>{item.nombreMedicamento}</Text>
                <Text style={styles.noteContent}>{item.gramos} </Text>
                <Text style={styles.noteContent}>{item.tiempo}</Text>
                <Text style={styles.noteContent}>{item.dias}</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => handleDeleteMedicamento(item.id_medicamento)}>
                  <Icon type="MaterialIcons" name="delete" />
                  <CustomAlertMedic
                    visible={isModalVisible2}
                    onConfirm={onConfirmDeleteMedi}
                    onCancel={onCancelDeleteMedi} //AQUI TIENE QUE SER onConfirmDelete
                  />
                </Pressable>
              </View>
            )}
          />
        </ScrollView>
        <FloatingAction
          actions={actions}
          color="green"
          position="right"
          onPressItem={name => {
            if (name === 'Notes') {
              navigation.navigate('CreateNotes');
            } else if (name === 'Medice') {
              navigation.navigate('AddMedice');
            } else if (name === 'Cites') {
              navigation.navigate('CreateCitas');
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mostrarCosas: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  FlatListMedicine: {
    //backgroundColor: '#ffff00',
  },
  FlatListNotes: {
    //backgroundColor: '#ff00ff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333', // Color del título
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555', // Color del mensaje
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336', // Color del botón de cancelar
  },
  confirmButton: {
    backgroundColor: '#4CAF50', // Color del botón de confirmación
  },
  cancelButtonText: {
    color: '#fff', // Color del texto de cancelar
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff', // Color del texto de confirmación
    fontSize: 16,
  },
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
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    top: 0,
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
  noteCardNotes: {
    color: '#333',
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(235, 255, 235, 1)',
    //rgba(0, 0, 0, 0.5)
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  noteCardMedicine: {
    color: '#333',
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(247, 245, 233, 1)',
    //
    //rgba(0, 0, 0, 0.5)
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
  containertext: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imagetext: {
    width: 365,
    height: 40,
    borderRadius: 10,
  },
  textWithBorder: {
    position: 'absolute',
    fontSize: 24, // Ajusta el tamaño de fuente según lo necesites
    fontWeight: 'bold',
    color: '#000', // Color del texto
    textShadowColor: 'orange', // Color del borde
    textShadowOffset: {width: 3, height: 3}, // Ajusta el desplazamiento del borde
    textShadowRadius: 2, // Ajusta el radio del borde
  },
});
