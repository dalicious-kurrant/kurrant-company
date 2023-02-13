import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';
import UserInfo from '../UserInfo/UserInfo';

const SideBar = () => {
  return (
    <>
      <Container>
        <UserInfo />

        <Navbar />
      </Container>
    </>
  );
};

export default SideBar;

const Container = styled.div`
  width: 27rem;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;
