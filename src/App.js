import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Panel from './components/panel';
import Maze from './maze';

const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 5px;
`;


function getDelayMs(speed) {
  return 1000 - 10 * speed;
} 

const App = () => {

  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [size, setSize] = useState(20);
  const [showAnimation, setShowAnimation] = useState(true);

  // 控制动画的速度，1 ~ 100，对应 delay 为 0 ~ 1000
  const [speed, setSpeed] = useState(100);



  function createMaze() {

    const maze = new Maze({
      width,
      height,
      gridSize: size,
      showAnimation,
      delayMs: getDelayMs(+speed),
    });
    maze.walk();
  }

  useEffect(() => {
    createMaze();
  }, []);

  return (
    <div>
      <Panel 
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        size={size}
        setSize={setSize}
        showAnimation={showAnimation}
        setShowAnimation={setShowAnimation}
        speed={speed}
        setSpeed={setSpeed}
      />

      <Button onClick={createMaze}>生成迷宫</Button>
    </div>
  );
};

export default App;
