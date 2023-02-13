import {useState} from 'react';
import styled from 'styled-components';
import Image from '../../common/Image';

const NavbarContents = ({
  name,
  id,
  iconSrc,
  selected,
  handleSelected,
  ...props
}) => {
  const [onHover, setOnHover] = useState(false);

  const handleClick = e => {
    const {id} = e.target;
    console.log(id);
  };

  return (
    <Container
      {...props}
      selected={selected}
      id={id}
      onHover={onHover}
      onClick={handleClick}
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}>
      <Image
        src={iconSrc}
        width={`3rem`}
        height={`3rem`}
        css={`
          margin-right: 2rem;
        `}
      />

      <Text>{name}</Text>
    </Container>
  );
};

export default NavbarContents;

const Container = styled.div`
  background-color: ${props =>
    props.onHover ? props.theme.colors.Grey07 : props.theme.colors.white};
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 3rem;
`;

const Text = styled.span`
  color: ${props => props.theme.colors.Grey07};
  font-size: 2rem;
`;
