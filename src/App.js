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


const App = () => {

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [size, setSize] = useState(30);


  function createMaze() {

    const maze = new Maze({
      width,
      height,
      gridSize: size,
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
      />

      <Button onClick={createMaze}>生成迷宫</Button>
    </div>
  );
};

export default App;
