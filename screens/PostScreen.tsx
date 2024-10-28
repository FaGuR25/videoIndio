import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import MiniBlog from './Miniblog';
import {View} from 'react-native-animatable';

const PostScreen = ({navigation}: {navigation: any}) => {
  const blogs = [
    {
      id: 1,
      title: '¿Por qué se ocasiona la diabetes?',
      content:
        'La causa exacta de la mayoría de los tipos de diabetes se desconoce.  En todos los casos, la glucosa se acumula en el torrente sanguíneo. Esto se debe a que el páncreas no produce suficiente insulina. Ambas clases de diabetes, tipo 1 y tipo 2, pueden causarse por una combinación de factores genéticos y ambientales Diabetes.',
      footer:
        '(s/f). Recuperado el 10 de junio de 2024, de Mayoclinic.org website: https://www.mayoclinic.org/es/diseases-conditions/diabetes/symptoms-causes/syc-20371444',
      image: require('../assets/icons/blog1.png'),
    },
    {
      id: 2,
      title: 'El Asma',
      content: 'Contenido del Blog 2...',
      image: require('../assets/icons/asma.png'),
    },
    {
      id: 3,
      title: 'Blog 3',
      content: 'Contenido del Blog 3...',
      image: require('../assets/icons/logome.png'),
    },
    {
      id: 4,
      title: 'Blog 3',
      content: 'Contenido del Blog 3...',
      image: require('../assets/icons/logome.png'),
    },
  ];

  const handleBlogPress = (blog: any) => {
    navigation.navigate('BlogDetailScreen', {blog});
  };

  return (
    <View style={styles.containerAll}>
      <Text style={styles.headerText}>CALENDARIO</Text>
      <View style={styles.divider} />
      <ScrollView style={styles.container}>
        {blogs.map(blog => (
          <MiniBlog
            key={blog.id}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            onPress={() => handleBlogPress(blog)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#8fcbbc',
  },
  headerText: {
    backgroundColor: '#8fcbbc',
    height: 50,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 0,
    alignItems: 'center',
    marginTop: 0,
  },
  containerAll: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#8fcbbc',
  },
  divider: {
    height: 1, // Altura de la línea
    backgroundColor: 'black', // Color de la línea
    marginVertical: 8, // Espacio alrededor de la línea
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
});

export default PostScreen;
