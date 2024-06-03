import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import MiniBlog from './Miniblog';

const PostScreen = ({navigation}) => {
  const blogs = [
    {
      id: 1,
      title: 'Miniblog',
      content: 'Contenido del Blog 1...',
      image: require('../assets/icons/logome.png'),
    },
    {
      id: 2,
      title: 'Blog 2',
      content: 'Contenido del Blog 2...',
      image: require('../assets/icons/logome.png'),
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
    backgroundColor: '#f5f5f5',
  },
});

export default PostScreen;
