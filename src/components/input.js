import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 50px;
  border-radius: 4px;
  padding: 4px;
  margin-right: 10px;
`;


const Input = props => {

  return (
    <span>
      {props.label}
      <StyledInput 
        onChange={(e) => props.onChange(+e.target.value)} 
        value={props.value}
      />
    </span>
  );
};

export default Input;
