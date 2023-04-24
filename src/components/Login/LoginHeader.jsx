import styled from 'styled-components';
import AppIcon from '../../assets/svg/AppIcon.svg';
const LoginHeader = () => {
  return (
    <Container>
      <AppIconWrap>
        <AppIconImg src={AppIcon} />
      </AppIconWrap>

      <TitleBoldSpan>
        고객사 관리자 <TitleMediumSpan>페이지입니다. </TitleMediumSpan>
      </TitleBoldSpan>
    </Container>
  );
};

export default LoginHeader;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
`;

const AppIconWrap = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 26px;
`;

const AppIconImg = styled.img`
  width: 100%;
  height: 100%;
`;

const TitleBoldSpan = styled.span`
  font-size: 35px;
  /* border: 1px solid
    ${props => {
    return props.theme.colors.black;
  }}; */
`;

const TitleMediumSpan = styled.span`
  font-weight: 300;
`;
