import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Login from '../components/Login/Login';

const LoginPage = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
