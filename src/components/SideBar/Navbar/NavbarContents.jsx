import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Image from '../../../common/Image';

const NavbarContents = ({
  name,
  id,
  iconSrc,
  selected,
  handleSelected,
  routeName,
  ...props
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = e => {
    const {id} = e.currentTarget;

    handleSelected(id);

    // navigate(routeName);
  };

  return (
    <Container
      {...props}
      selected={selected}
      id={id}
      onClick={handleClick}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}>
      <Image
        src={iconSrc}
        width={`3rem`}
        height={`3rem`}
        css={`
          margin-right: 2rem;
        `}
      />

      <Text hovered={hovered}>{name}</Text>
    </Container>
  );
};

export default NavbarContents;

const Container = styled.div`
  background-color: ${props =>
    props.selected ? props.theme.colors.Grey03 : props.theme.colors.white};
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 3rem;
`;

const Text = styled.span`
  color: ${props =>
    props.hovered ? props.theme.colors.Blue02 : props.theme.colors.Grey07};
  font-size: 2rem;
`;
