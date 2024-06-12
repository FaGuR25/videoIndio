import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const ImageButton = ({onPress, imageSource, style}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Image source={imageSource} />
  </TouchableOpacity>
);

export default ImageButton;
