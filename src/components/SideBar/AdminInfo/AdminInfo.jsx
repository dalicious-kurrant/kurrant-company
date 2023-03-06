import styled from 'styled-components';

import KurrantLogo from 'assets/svg/KurrantLogo.svg';

import DefaultProfileIcon from 'assets/svg/DefaultProfileIcon.svg';
import {useNavigate} from 'react-router-dom';
import {useGetCorporationInfo} from 'hooks/useCorporation';
import {Button} from 'semantic-ui-react';

const AdminInfo = () => {
  const navigate = useNavigate();
  const {data: corpList} = useGetCorporationInfo();
  const list = corpList?.data;

  const handleLogout = () => {
    // 로그아웃 로직
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <Container>
      <LogoWrap>
        <Image src={KurrantLogo} />
        <SmallHorizontalBar />
        <Occupation>고객사 관리자</Occupation>
      </LogoWrap>

      <ProfileWrap>
        <ProfileImageWrap>
          <ProfileImage src={DefaultProfileIcon} />
        </ProfileImageWrap>

        <NameWrap>
          <CompanyName>{list?.name}</CompanyName>
          <UserName>{list?.managerName}</UserName>
        </NameWrap>
      </ProfileWrap>
      <Button.Group>
        <BtnWrap>
          <LogoutButten onClick={handleLogout}>로그아웃</LogoutButten>
        </BtnWrap>
      </Button.Group>
    </Container>
  );
};

export default AdminInfo;

const Container = styled.div`
  width: 100%;
  height: 24rem;
  border-bottom: 2px solid ${props => props.theme.colors.Grey03};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 8rem;
`;

const LogoWrap = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
const SmallHorizontalBar = styled.div`
  width: 2px;
  height: 2rem;
  border-right: 1.6px solid ${props => props.theme.colors.Grey07};

  margin: 0 2rem;
`;
const Occupation = styled.span`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.Grey07};
`;
const ProfileWrap = styled.div`
  display: flex;
  width: 80%;
  padding: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
const ProfileImageWrap = styled.div`
  width: 4rem;
  height: 4rem;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const NameWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.span`
  font-size: 1.7rem;
  margin-bottom: 0.8rem;
`;
const UserName = styled.span`
  font-size: 1.7rem;
  font-weight: 800;
`;
const LogoutButten = styled(Button)`
  background-color: ${props => props.theme.colors.white};
  font-size: 1.8rem;
`;

const BtnWrap = styled.div`
  transform: scale(calc(100 / 62.5));
`;
