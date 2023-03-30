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
  padding: 3.6rem 4.8rem;
  width: 100vw;
  margin-left: 250px;
  background-color: ${props => props.theme.colors.Grey02};
`;
