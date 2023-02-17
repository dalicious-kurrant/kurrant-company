import {useState} from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';

const Register = ({submitMutate}) => {
  const [input, setInput] = useState({
    userId: '',
    groupId: '',
    groupName: '',
    employeeEmail: '',
    employeeName: '',
    employeePhone: '',
  });

  const handleSubmit = e => {
    e.preventDefault();

    console.log(input);

    // 서버에 보내기
    submitMutate(input);

    setInput({
      userId: '',
      groupId: '',
      groupName: '',
      employeeEmail: '',
      employeeName: '',
      employeePhone: '',
    });
  };

  return (
    <Container>
      <H2>가입 리스트에 추가하기</H2>

      <Form onSubmit={handleSubmit}>
        <InputWrap>
          <TextInput
            input={input}
            setInput={setInput}
            name="userId"
            placeholder={''}
            flex={1}
          />
          <TextInput
            input={input}
            setInput={setInput}
            name="groupId"
            placeholder={''}
            flex={1}
          />
          <TextInput
            input={input}
            setInput={setInput}
            name="groupName"
            placeholder={''}
            flex={1}
          />
          <TextInput
            input={input}
            setInput={setInput}
            name="employeeEmail"
            placeholder={''}
            flex={1}
          />
          <TextInput
            input={input}
            setInput={setInput}
            name="employeeName"
            placeholder={''}
            flex={1}
          />
          <TextInput
            input={input}
            setInput={setInput}
            name="employeePhone"
            placeholder={''}
            flex={1}
          />
        </InputWrap>

        <SubmitButton>추가하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  flex: 1;
`;

const Form = styled.form`
  /* display: flex; */
`;

const H2 = styled.h2`
  font-size: 2rem;

  margin-bottom: 1rem;
`;

const Wrap = styled.div``;

const InputWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  font-size: 1.6rem;
  margin: 1rem 0;
`;
