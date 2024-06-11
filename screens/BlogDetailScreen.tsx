import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const BlogDetailScreen = ({ route }) => {
  const { blog } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={blog.image} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.content}</Text>
      <Text style={styles.content}>{blog.footer}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
  },
});

export default BlogDetailScreen;
