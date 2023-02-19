import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const TextAreaInput = ({
  input = {},
  name = '',
  setInput = yes => {},
  placeholder = '안녕',
  width = '100%',
  maxLength = 2000,
  height = '100%',
}) => {
  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;

    setInput({...input, [name]: value});
  };

  return (
    <TextAreaText
      name={name}
      required
      onChange={handleChange}
      placeholder={placeholder}
      width={width}
      value={input[name]}
      maxLength={maxLength}
      height={height}
    />
  );
};
export default TextAreaInput;

const TextAreaText = styled.textarea`
  display: inline-block;
  width: ${({width}) => width};
  height: ${({height}) => height};
  resize: none;
  overflow: hidden;
  outline: none;
  border: 0;
  font-size: 1.2rem;
  padding: 1rem 0.6rem;

  &::placeholder {
    color: ${props => props.theme.colors.Grey07};
  }

  &:hover {
    outline: none;
  }

  &:focus {
    overflow: auto;
    border: 2px solid ${props => props.theme.colors.Grey07};
  }
`;
