import styled from 'styled-components';

const SideBar = () => {
  return (
    <>
      <Container>
        <div>SideBar</div>;
      </Container>
    </>
  );
};

export default SideBar;

const Container = styled.div`
  width: 30rem;
  height: 100vh;
  border: 1px solid black;
`;
