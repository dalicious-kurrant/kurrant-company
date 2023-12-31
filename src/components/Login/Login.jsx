import axios from 'axios';
import instance from 'configs/axiosConfig';
import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const initialInput = {code: '', password: ''};

  const [input, setInput] = useState(initialInput);
  const [clickReady, setClickReady] = useState(false);
  const validation = input.code !== '' && input.password !== '';
  const handleChange = e => {
    e.preventDefault();
    const {id, value} = e.target;

    setInput({...input, [id]: value});
  };

  useEffect(() => {
    if (input.code && input.password) {
      setClickReady(true);
    } else {
      setClickReady(false);
    }
  }, [input]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!clickReady) return;

    try {
      const res = await instance.post('auth/login', input);
      console.log(res);
      if (res.statusCode === 200) {
        const accessToken = res.data.accessToken;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('code', input['code']);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('groupId', res.data.groupId);

        //window.confirm(`로그인 성공!`);
        window.location.replace('/notice');

        setInput(initialInput);
      }
    } catch (err) {
      window.confirm(`로그인 실패, 그룹 인증코드와 비번을 확인하세요`);
      if (err.response.status === 401) {
        // setLoginCheck(true);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>로그인</Title>

      <Input
        type="text"
        required
        id="code"
        onChange={handleChange}
        placeholder="그룹 인증코드를 입력하세요"
        value={input['code']}
      />
      <Input
        type="password"
        required
        id="password"
        onChange={handleChange}
        placeholder="비밀번호를 입력하세요"
        value={input['password']}
      />
      <LoginButton clickReady={clickReady} disabled={!validation}>
        로그인
      </LoginButton>
    </Form>
  );
};

export default Login;

const Form = styled.form`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 20px;
`;

// const Input = styled.input`
//   width: 90%;
//   background-color: ${props => props.theme.colors.white};
//   height: 5rem;
//   padding: 0 1.8rem;
//   font-size: 1.6rem;
//   border: 1px solid ${props => props.theme.colors.borderGrey};
//   border-radius: 1.2rem;
//   margin-bottom: 1.2rem;
// `;
const Input = styled.input`
  width: 90%;
  background-color: ${props => props.theme.colors.white};
  height: 56px;
  padding: 0 18px;
  font-size: 16px;
  border: 0.5px solid #c8c8d2;
  border-radius: 8px;
  margin-bottom: 10px;
  outline: none;

  ::placeholder {
    color: #c8c8d2;
  }
`;

// const LoginButton = styled.button`
//   width: 90%;
//   height: 5rem;
//   border-radius: 1.2rem;
//   color: black;
//   opacity: ${({clickReady}) => {
//     return clickReady ? 1 : 0.35;
//   }};
// `;

const LoginButton = styled.button`
  width: 90%;
  height: 56px;
  border-radius: 8px;
  margin-top: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({disabled}) => !disabled && 'white'};
  background: ${({theme, disabled}) =>
    disabled
      ? '#F3F3F3'
      : 'linear-gradient(270deg, #0A0AA4 0%, #3D00E6 57.86%, #5A1EFF 100%)'};
  border: none;
  font-weight: 600;
`;
