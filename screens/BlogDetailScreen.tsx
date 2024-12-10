import React from 'react';
import {Text, Image, StyleSheet, ScrollView} from 'react-native';

const BlogDetailScreen = ({route}: {route: any}) => {
  const {blog} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={blog.image} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.content}</Text>
      {blog.footer && <Text style={styles.footer}>{blog.footer}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'justify',
  },
  footer: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default BlogDetailScreen;
