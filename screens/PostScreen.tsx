import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import MiniBlog from './Miniblog';

const PostScreen = ({navigation}) => {
  const blogs = [
    {
      id: 1,
      title: '¿Por qué se ocaciona la diabetes?',
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
  ];

  const handleBlogPress = blog => {
    navigation.navigate('BlogDetailScreen', {blog});
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#8fcbbc',
  },
});

export default PostScreen;
