import React from 'react';
import Input from '../input';
import Checkbox from '../checkbox';

const Panel = (props) => {

  function handleSpeed(e) {
    props.setSpeed(+e.target.value);
  }

  function handleClickRadio(e) {
    props.setAlgo(e.target.value);
  }

  return (
    <div>

      <div>
        <Input label="迷宫宽度：" onChange={props.setWidth} value={props.width} />
        <Input label="迷宫高度：" onChange={props.setHeight} value={props.height} />
        <Input label="格子大小：" onChange={props.setSize} value={props.size} />
      </div>

      <div>
        <Checkbox label="是否显示动画"
          checked={props.showAnimation}
          onChange={props.setShowAnimation}
        />
        
        <span style={{marginLeft: 20}}>
          动画速度
          <input 
            type="range" min="1" max="100"  value={props.speed} id="myRange"
            onChange={handleSpeed}
          ></input>
        </span>
      </div>

      <div>
        <span>生成算法：</span>
        <input type="radio" name="random" value="random" 
          checked={props.algo === 'random'}
          onChange={handleClickRadio}
        />
        <label htmlFor="random" style={{marginRight: 5}}>random</label>

        <input type="radio" name="dfs" value="dfs" checked={props.algo === 'dfs'} 
          onChange={handleClickRadio}
        />
        <label htmlFor="dfs">dfs</label>
      </div>

    </div>
  );
};

export default Panel;
