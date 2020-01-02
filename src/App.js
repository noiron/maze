import React, { useState, useEffect } from 'react';
import Panel from './components/panel';
import Maze from './maze';

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

      <button onClick={createMaze}>生成新的迷宫</button>
    </div>
  );
};

export default App;
