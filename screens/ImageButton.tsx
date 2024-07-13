import {Image, Pressable, Text, StyleSheet} from 'react-native';

export default function AddMedice({onPress, source, imageStyle, text}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => {
        return [styles.row, pressed ? styles.row : styles.notPressed];
      }}>
      <Image style={imageStyle} source={source} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0,
  },
  notPressed: {
    opacity: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 16,
  },
});
/* 

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ImageButton = ({ onPress, imageStyle, source, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Image source={source} style={[styles.image, imageStyle]} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ImageButton;
 */