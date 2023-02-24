import styled from 'styled-components';

import {Button} from 'semantic-ui-react';

const CRUDBundle = ({handleBundleClick, showRegister}) => {
  const handleClick = e => {
    if (e.target.id === 'register' || e.target.id === 'edit') {
      if (showRegister) {
        window.confirm("'닫기'버튼을 누른후에 시도해주세요");
        return;
      }
    }

    handleBundleClick(e.target.id);
  };

  const handleSend = () => {
    console.log('최종적용하기');
  };

  return (
    <Container>
      {/* <Wrap>
        <Button.Group>
          <BtnWrap>
            <Button id="register" color="green" inverted onClick={handleClick}>
              추가 열기
            </Button>
          </BtnWrap>
          <BtnWrap>
            <Button id="edit" color="blue" inverted onClick={handleClick}>
              수정 열기
            </Button>
          </BtnWrap>
          <BtnWrap>
            <Button id="delete" inverted color="red" onClick={handleClick}>
              삭제하기
            </Button>
          </BtnWrap>
        </Button.Group>

        <Button.Group>
          <BtnWrap>
            <Button onClick={handleSend}>최종적용하기</Button>
          </BtnWrap>
        </Button.Group>
      </Wrap> */}

      <Wrap>
        <Button.Group>
          <BtnWrap>
            <Button id="register" color="green" inverted onClick={handleClick}>
              추가 열기
            </Button>
          </BtnWrap>

          <BtnWrap>
            <Button id="edit" color="blue" inverted onClick={handleClick}>
              수정 열기
            </Button>
          </BtnWrap>

          <BtnWrap>
            <Button id="delete" inverted color="red" onClick={handleClick}>
              삭제하기
            </Button>
          </BtnWrap>
        </Button.Group>
        <div>
          <Button.Group>
            <Button onClick={handleSend}>최종적용하기</Button>
          </Button.Group>
        </div>
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

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnWrap = styled.div`
  margin: 0.4rem 0.2rem;
`;
