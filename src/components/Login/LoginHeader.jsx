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
  margin-bottom: 6rem;
`;

const AppIconWrap = styled.div`
  width: 10rem;
  height: 10rem;
  margin-bottom: 2.6rem;
`;

const AppIconImg = styled.img`
  width: 100%;
  height: 100%;
`;

const TitleBoldSpan = styled.span`
  font-weight: 600;
  font-size: 2.8rem;
  /* border: 1px solid
    ${props => {
    return props.theme.colors.black;
  }}; */
`;
const TitleMediumSpan = styled.span`
  font-weight: 300;
`;
