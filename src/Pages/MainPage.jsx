import styled from 'styled-components';
import Contents from '../components/Contents/Contents';
import SideBar from '../components/SideBar/SideBar';

const MainPage = () => {
  return (
    <Container>
      <SideBar />

      <Contents />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;
