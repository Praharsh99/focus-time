import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';

export const RoundedButton = ({
  size = 125,
  style = {},
  titleStyles = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={props.handlePress}
      style={[styles(size).radius, style]}>
      <Text style={[styles(size).title, titleStyles]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderWidth: 2,
      borderColor: colors.white,
      borderRadius: size / 2,
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: colors.white,
      fontSize: size / 3,
    },
  });
