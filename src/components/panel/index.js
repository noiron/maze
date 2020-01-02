import React from 'react';
import Input from '../input';

const Panel = (props) => {

  return (
    <div>

      <Input label="迷宫宽度：" onChange={props.setWidth} value={props.width} />
      <Input label="迷宫高度：" onChange={props.setHeight} value={props.height} />
      <Input label="格子大小：" onChange={props.setSize} value={props.size} />

    </div>
  );
};

export default Panel;
