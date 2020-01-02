import React from 'react';

const Input = props => {

  return (
    <span>
      {props.label}
      <input 
        onChange={(e) => props.onChange(+e.target.value)} 
        value={props.value}
      />
    </span>
  );
};

export default Input;
