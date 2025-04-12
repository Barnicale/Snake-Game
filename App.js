import Snake from './components/Snake';
import Food from './components/Food';
import { CELL_SIZE, GRID_SIZE } from './constants';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';



export default function App() {
  
  const randomFoodPosition = (snake) => {
    let newPos;
    let isOnSnake;
  
    do {
      newPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
  
      // check if it overlaps with any snake segment
      isOnSnake = snake.some(seg => seg.x === newPos.x && seg.y === newPos.y);
    } while (isOnSnake);
  
    return newPos;
  };
  
  const [snake, setSnake] = useState([{ x: 2, y: 5 }]); // starting point
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(() => randomFoodPosition([{ x: 2, y: 5 }]));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake(prevSnake => {
        if (!prevSnake[0]) return prevSnake; // skip move if somehow broken
        const head = prevSnake[0];
        let newHead;
  
        if (direction === 'RIGHT') newHead = { x: head.x + 1, y: head.y };
        if (direction === 'LEFT') newHead = { x: head.x - 1, y: head.y };
        if (direction === 'UP') newHead = { x: head.x, y: head.y - 1 };
        if (direction === 'DOWN') newHead = { x: head.x, y: head.y + 1 };
  
        if (newHead.x === food.x && newHead.y === food.y) {
          console.log('ATE FOOD'); // should only trigger once
          setFood(randomFoodPosition(prevSnake));
          setScore(prev => prev + 1);
          return [newHead, ...prevSnake]; // grow the snake
        }
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          console.log("GAME OVER");
          setScore(0);
          return [{ x: 2, y: 5 }]; // or reset snake
        }
        
  
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 200);
  
    return () => clearInterval(interval);
  }, [direction, food]);
  

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Text style={styles.scoreText}>
            Score: {score}
        </Text>

        {/* Debug visual grid */}
        {Array.from({ length: GRID_SIZE }).map((_, y) =>
          Array.from({ length: GRID_SIZE }).map((_, x) => (
            <View
              key={`${x},${y}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderWidth: 0.5,
                borderColor: '#333',
                position: 'absolute',
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
              }}
            />
          ))
        )}
  
        
        <Snake segments={snake}/>
        <Food food={food}/>
      </View>
  
      {/* Debug text */}
      <Text style={{ color: 'white', marginTop: 10 }}>
        Snake: {snake[0].x},{snake[0].y} | Food: {food.x},{food.y}
      </Text>
  
      {/* Controls */}
      <View style={styles.controls}>
        <Pressable onPress={() => setDirection('UP')} style={styles.controlButton}>
          <Text style={styles.controlText}>▲</Text>
        </Pressable>
  
        <View style={styles.horizontalControls}>
          <Pressable onPress={() => setDirection('LEFT')} style={styles.controlButton}>
            <Text style={styles.controlText}>◀︎</Text>
          </Pressable>
          <View style={styles.spacer} />
          <Pressable onPress={() => setDirection('RIGHT')} style={styles.controlButton}>
            <Text style={styles.controlText}>▶︎</Text>
          </Pressable>
        </View>
  
        <Pressable onPress={() => setDirection('DOWN')} style={styles.controlButton}>
          <Text style={styles.controlText}>▼</Text>
        </Pressable>
      </View>
    </View>
  );
  


      
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
    backgroundColor: '#222',
    position: 'relative',
  },
  controlButton: {
    backgroundColor: '#444',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  controlText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  controls: {
    marginTop: 20,
    alignItems: 'center',
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    marginVertical: 10,
  },
  spacer: {
    width: 40,
  },
  scoreText: {
    color: "#fff",
    fontSize: 25,
    position: "absolute",
    top: -40,
    left: 80,
  }
});
