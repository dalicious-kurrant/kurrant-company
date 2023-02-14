import styled from 'styled-components';
import Navbar from './Navbar/Navbar';
import AdminInfo from './AdminInfo/AdminInfo';

const SideBar = () => {
  return (
    <>
      <Container>
        <AdminInfo />
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
