import styled from 'styled-components';

const CRUDBundle = ({handleBundleClick, showRegister}) => {
  const handleClick = e => {
    if (e.target.id === 'register' || e.target.id === 'edit') {
      if (showRegister) {
        window.confirm("'닫기'버튼을 누른후에 시도해주세요");
      }
    }

    handleBundleClick(e.target.id);
  };

  return (
    <Container>
      <Wrap>
        <Button id="register" onClick={handleClick}>
          가입
        </Button>
        <Button id="edit" onClick={handleClick}>
          수정
        </Button>
        <Button id="delete" onClick={handleClick}>
          삭제
        </Button>
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

const Button = styled.button`
  font-size: 2.2rem;
  margin: 0.6rem;
`;
