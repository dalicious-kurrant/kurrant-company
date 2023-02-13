import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const initialInput = {id: '', password: ''};

  const [input, setInput] = useState(initialInput);
  const [clickReady, setClickReady] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    const {id, value} = e.target;

    setInput({...input, [id]: value});
  };

  useEffect(() => {
    if (input.id && input.password) {
      setClickReady(true);
    } else {
      setClickReady(false);
    }
  }, [input]);

  const handleSubmit = () => {
    if (!clickReady) return;

    if (true) {
      window.confirm(`로그인 성공!`);
      navigate('/main');
      setInput(initialInput);
    } else {
      window.confirm(`로그인 실패, 그룹 인증코드와 비번을 확인하세요`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>로그인</Title>

      <Input
        type="text"
        required
        id="id"
        onChange={handleChange}
        placeholder="그룹 인증코드를 입력하세요"
        value={input['id']}
      />
      <Input
        type="password"
        required
        id="password"
        onChange={handleChange}
        placeholder="비밀번호를 입력하세요"
        value={input['password']}
      />
      <LoginButton clickReady={clickReady}>로그인</LoginButton>
    </Form>
  );
};

export default Login;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 2.3rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 90%;
  background-color: ${props => props.theme.colors.white};
  height: 5rem;
  padding: 0 1.8rem;
  font-size: 1.6rem;
  border: 1px solid ${props => props.theme.colors.borderGrey};
  border-radius: 1.2rem;
  margin-bottom: 1.2rem;
`;

const LoginButton = styled.button`
  width: 90%;
  height: 5rem;
  border-radius: 1.2rem;
  color: black;
  opacity: ${({clickReady}) => {
    return clickReady ? 1 : 0.35;
  }};
`;
