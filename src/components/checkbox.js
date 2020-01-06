import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.span`

  input {
    width: 15px;
    height: 15px;
  }
`;


const Checkbox = (props) => {

  function handleChange(e) {
    props.onChange(e.target.checked);
  }

  return (
    <StyledInput>
      <input 
        type="checkbox"
        checked={props.checked} 
        onChange={handleChange} 
      />
      <span>{props.label}</span>
    </StyledInput>
  );
};

export default Checkbox;
