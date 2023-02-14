import {Outlet} from 'react-router-dom';
import styled from 'styled-components';

const Contents = () => {
  return (
    <Container>
      <div>여긴 컨테이너다 </div>

      <Outlet />
    </Container>
  );
};

export default Contents;

const Container = styled.div`
  flex: 1;

  background-color: aliceblue;
`;
