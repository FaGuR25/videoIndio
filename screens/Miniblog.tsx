import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const MiniBlog = ({
  title,
  image,
  onPress,
}: {
  title: string;
  image: any;
  onPress: any;
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
});

export default MiniBlog;
