import {Outlet} from 'react-router-dom';
import styled from 'styled-components';
import ContentsHeader from './ContentsHeader/ContentsHeader';

const Contents = () => {
  return (
    <Container>
      <ContentsHeader />

      <Outlet />
    </Container>
  );
};

export default Contents;

const Container = styled.div`
  flex: 1;
  padding: 0px 48px 48px 48px;
  width: 100vw;
  margin-left: 250px;
  background-color: ${props => props.theme.colors.Grey02};
`;
