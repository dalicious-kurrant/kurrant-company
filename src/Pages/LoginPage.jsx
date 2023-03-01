import React from 'react';

import styled from 'styled-components';
import Login from '../components/Login/Login';
import LoginHeader from '../components/Login/LoginHeader';

const LoginPage = () => {
  return (
    <Container>
      <Wrap>
        <LoginHeader />
        <Login />
      </Wrap>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36rem;
  height: 50rem;
`;
