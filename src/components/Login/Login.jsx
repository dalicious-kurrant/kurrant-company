import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const initialInput = {id: '', password: ''};

  const [input, setInput] = useState(initialInput);

  const handleChange = e => {
    e.preventDefault();
    const {id, value} = e.target;

    setInput({...input, [id]: value});
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSubmit = () => {
    console.log(input);

    if (false) {
      window.confirm(`로그인 성공!`);
      navigate('/main');
      setInput(initialInput);
    } else {
      window.confirm(`로그인 실패, 그룹 인증코드와 비번을 확인하세요`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <LoginButton>로그인</LoginButton>
    </Form>
  );
};

export default Login;

const Form = styled.form`
  width: 60rem;
  height: 60rem;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 90%;
`;

const LoginButton = styled.button`
  width: 90%;
`;
