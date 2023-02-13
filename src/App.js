import Router from './Shared/Router';
import './App.css';
import styled from 'styled-components';

function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
`;
