import {useEffect} from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';

const Register = ({
  status,
  submitMutate,
  handleClose,
  dataToEdit,

  editMutate,
}) => {
  //   const [registerStatus, setRegisterStatus] = useState('register');

  useEffect(() => {
    // if (status) setRegisterStatus(status);

    if (status === 'edit') {
      setInput(dataToEdit);
    }
  }, [status]);

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

    // 서버에 보내기

    // 가입

    if (status === 'register') {
      submitMutate(input);
    } else if (status === 'edit') {
      editMutate(input);

      handleClose();
    }

    setInput({
      userId: '',
      groupId: '',
      groupName: '',
      employeeEmail: '',
      employeeName: '',
      employeePhone: '',
    });
  };

  const handleCloseBtn = () => {
    handleClose();
  };

  return (
    <Container>
      <TitleButtonWrap>
        <H2>
          가입 리스트{status === 'register' ? '에 추가하기' : ' 수정하기'}
        </H2>
        <button onClick={handleCloseBtn}> 닫기 </button>
      </TitleButtonWrap>

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

        <SubmitButton>
          {status === 'register' ? '추가' : ' 수정'}하기
        </SubmitButton>
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
const TitleButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem 1rem;
`;

const Wrap = styled.div``;

const InputWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  font-size: 1.6rem;
  margin: 1rem 0;
`;
