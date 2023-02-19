import React from 'react';
import styled from 'styled-components';
import TextAreaInput from './TextAreaInput/TextAreaInput';

const MemoInput = ({id, handleSubmit}) => {
  console.log(id);

  return (
    <Form>
      <TextAreaInput />
    </Form>
  );
};
export default MemoInput;

const Form = styled.form`
  flex: 1;
  background-color: #ffffff;
  height: 100%;
`;
