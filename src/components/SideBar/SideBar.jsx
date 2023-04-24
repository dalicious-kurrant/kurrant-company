import styled from 'styled-components';
import Navbar from './Navbar/Navbar';
import AdminInfo from './AdminInfo/AdminInfo';
import Sidebar from 'components/Snb/Sidebar';

const SideBar = () => {
  return (
    <>
      <Container>
        {/* <AdminInfo />
        <Navbar /> */}
        <Sidebar />
      </Container>
    </>
  );
};

export default SideBar;

const Container = styled.div`
  width: 256px;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  display: flex;
  flex-direction: column;
`;
