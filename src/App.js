import Router from './Shared/Router';
import './App.css';
import styled from 'styled-components';
import {GlobalStyle} from 'theme/GlobalStyle';

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Router />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors};
`;
