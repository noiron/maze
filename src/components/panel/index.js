import React from 'react';
import Input from '../input';
import Checkbox from '../checkbox';

const Panel = (props) => {

  return (
    <div>

      <Input label="迷宫宽度：" onChange={props.setWidth} value={props.width} />
      <Input label="迷宫高度：" onChange={props.setHeight} value={props.height} />
      <Input label="格子大小：" onChange={props.setSize} value={props.size} />

      <Checkbox label="是否显示动画" 
        checked={props.showAnimation} 
        onChange={props.setShowAnimation}
      />

    </div>
  );
};

export default Panel;
