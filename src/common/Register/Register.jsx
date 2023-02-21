import {CRUDAvaliableList} from 'data/CRUDAvaliableList';
import {useEffect} from 'react';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import useLocationHooks from './hooks/useLocationHooks';
import {
  handleSubmitLogic,
  makeInitialInput,
  tellAlertLogic,
} from './logics/RegisterLogics';
import TextInput from './TextInput';

const Register = ({
  registerStatus,
  submitMutate,
  handleClose,
  data,
  fieldsInput,
  editMutate,
}) => {
  const {pathname} = useLocationHooks(handleClose);

  // input 초기값 만들기

  const [input, setInput] = useState(makeInitialInput(data));

  useEffect(() => {
    if (registerStatus === 'edit') {
      setInput(data);
    }
  }, [registerStatus]);

  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    handleSubmitLogic(
      input,
      fieldsInput,
      registerStatus,
      setSubmitStatus,
      submitMutate,
      editMutate,
      handleClose,
    );

    // const fieldsArray = fieldsInput.map(value => input[value.fieldName]);

    // if (registerStatus === 'register') {
    //   if (fieldsArray.includes('')) {
    //     setSubmitStatus('notFulfilled');
    //     return;
    //   }
    //   setSubmitStatus('doneRegister');
    //   submitMutate(input);
    // } else if (registerStatus === 'edit') {
    //   if (fieldsArray.includes('')) {
    //     setSubmitStatus('notFulfilled');
    //     return;
    //   }

    //   setSubmitStatus('doneEdit');
    //   editMutate(input);

    //   handleClose();
    // }

    const initialInput = makeInitialInput();
    setInput(initialInput);
  };

  const handleCloseBtn = () => {
    handleClose();
  };

  const tellAlert = statusName => {
    tellAlertLogic(statusName);
  };

  return (
    <Container>
      <TitleButtonWrap>
        <H2>
          가입 리스트
          {registerStatus === 'register' ? '에 추가하기' : ' 수정하기'}
        </H2>
        <button onClick={handleCloseBtn}> 닫기 </button>
      </TitleButtonWrap>

      <Form onSubmit={handleSubmit}>
        <InputWrap>
          {fieldsInput.map((value, index) => (
            <TextInput
              key={index}
              input={input}
              setInput={setInput}
              required
              name={value.fieldName}
              placeholder={value.placeholder}
              maxCharLength={value.maxCharLength}
              flex={value.flex}
            />
          ))}
        </InputWrap>

        {tellAlert(submitStatus)}

        <SubmitButton>
          {registerStatus === 'register' ? '추가' : ' 수정'}하기
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  flex: 1;
  margin-bottom: 2rem;
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

const InputWrap = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  font-size: 1.6rem;
  margin: 1rem 0;
`;
