import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CELL_SIZE } from '../constants';

export default function Food({ food }) {
  if (!food) return null;

  return (
    <View
      style={[
        styles.food,
        {
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  food: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'red',
  },
});
