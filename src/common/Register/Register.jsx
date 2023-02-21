import {CRUDAvaliableList} from 'data/CRUDAvaliableList';
import {useEffect} from 'react';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import TextInput from './TextInput';

const Register = ({
  status,
  submitMutate,
  handleClose,
  dataToEdit,
  fieldsInput,
  editMutate,
}) => {
  const {pathname} = useLocation();

  useEffect(() => {
    if (
      !CRUDAvaliableList.map(value => {
        return `/main/${value}`;
      }).includes(pathname)
    ) {
      handleClose();
    }
  }, [pathname]);

  useEffect(() => {
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

  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const fieldsArray = fieldsInput.map(value => input[value.fieldName]);

    if (status === 'register') {
      if (fieldsArray.includes('')) {
        setSubmitStatus('notFulfilled');
        return;
      }
      setSubmitStatus('doneRegister');
      submitMutate(input);
    } else if (status === 'edit') {
      if (fieldsArray.includes('')) {
        setSubmitStatus('notFulfilled');
        return;
      }

      setSubmitStatus('doneEdit');
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

  const tellAlert = statusName => {
    switch (statusName) {
      case 'notFulfilled':
        return <h1>작성하신 곳에 혹시 빈칸이 있나 확인해보세요...</h1>;
      case 'doneRegister':
        return <h1>추가되었습니다 </h1>;
      case 'doneEdit':
        return <h1>수정되었습니다 </h1>;
      default:
        return;
    }
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
          {status === 'register' ? '추가' : ' 수정'}하기
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
