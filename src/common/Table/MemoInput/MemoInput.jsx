import React from 'react';
import styled from 'styled-components';
import TextAreaInput from './TextAreaInput/TextAreaInput';

const MemoInput = ({id, handleChange, checkBlur, input}) => {
  return (
    <Form>
      <TextAreaInput
        name="memo"
        onChange={handleChange}
        input={input}
        checkBlur={checkBlur}
      />
    </Form>
  );
};
export default MemoInput;

const Form = styled.form`
  flex: 1;
  background-color: #ffffff;
  height: 100%;
`;
