import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MiniBlog = ({title, content, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
  );
};

const PostScreen = ({navigation}) => {
  const blogs = [
    {id: 1, title: 'Blog 1', content: 'Contenido del Blog 1...'},
    {id: 2, title: 'Blog 2', content: 'Contenido del Blog 2...'},
    {id: 3, title: 'Blog 3', content: 'Contenido del Blog 3...'},
  ];

  const handleBlogPress = blog => {
    navigation.navigate('BlogDetail', {blog});
  };

  return (
    <View style={styles.container}>
      {blogs.map(blog => (
        <MiniBlog
          key={blog.id}
          title={blog.title}
          content={blog.content}
          onPress={() => handleBlogPress(blog)}
        />
      ))}
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
});
