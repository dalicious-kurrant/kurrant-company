import styled from 'styled-components';

const CRUDBundle = ({handleBundleClick}) => {
  const handleClick = e => {
    handleBundleClick(e.target.id);
  };

  return (
    <Container>
      <Wrap>
        <div>CRUDBundle</div>
        <button id="register" onClick={handleClick}>
          가입
        </button>
        <button id="edit" onClick={handleClick}>
          수정
        </button>
        <button id="delete" onClick={handleClick}>
          삭제
        </button>
      </Wrap>
    </Container>
  );
};

export default CRUDBundle;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const Wrap = styled.div``;
