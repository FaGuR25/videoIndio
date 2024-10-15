import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BlogDetail = ({route}: {route: any}) => {
  const {blog} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.content}</Text>
    </View>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 18,
  },
});
