import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CELL_SIZE } from '../constants';

export default function Snake({ segments }) {
  return (
    <>
      {segments.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.snakeSegment,
            {
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            },
          ]}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  snakeSegment: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'limegreen',
  },
});
