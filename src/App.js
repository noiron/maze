import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Panel from './components/panel';
import Maze from './maze';
import MazeDFS from './maze-dfs';
import * as utils from './utils';

const mazeFactories = {
  random: Maze,
  dfs: MazeDFS,
};

const Box = styled.div`
  .main {
    display: inline-block;
    position: relative;
  }
  .loading {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;

const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

function getDelayMs(speed) {
  return 1000 - 10 * speed;
}

const App = () => {
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [size, setSize] = useState(20);
  const [showAnimation, setShowAnimation] = useState(true);
  const [algo, setAlgo] = useState('dfs'); // 选择生成迷宫的算法

  // 控制动画的速度，1 ~ 100，对应 delay 为 0 ~ 1000
  const [speed, setSpeed] = useState(100);

  async function createMaze() {
    setLoading(true);
    const MazeFactory = mazeFactories[algo];
    if (!MazeFactory) return;

    await utils.delay(100);
    const maze = new MazeFactory({
      width,
      height,
      gridSize: size,
      showAnimation,
      delayMs: getDelayMs(+speed),
      finishNotice,
    });
    maze.walk();
  }

  function finishNotice() {
    setLoading(false);
  }

  useEffect(() => {
    createMaze();
  }, []);

  const [loading, setLoading] = useState(true);

  return (
    <Box>
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
          algo={algo}
          setAlgo={setAlgo}
        />

        <Button
          onClick={() => {
            createMaze();
          }}
        >
          生成迷宫
        </Button>
      </div>

      <div className="main">
        <canvas id="drawing"></canvas>
        {loading && <div className="loading">生成中……</div>}
      </div>
    </Box>
  );
};

export default App;
