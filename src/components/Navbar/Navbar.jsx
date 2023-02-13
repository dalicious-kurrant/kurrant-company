import {useState} from 'react';
import styled from 'styled-components';
import NavbarContents from './NavbarContents';

// import ApartmentIcon from '../../assets/svg/ApartmentIcon.svg';
// import Profile2PeopleIcon from '../../assets/svg/Profile2PeopleIcon.svg';

import Image from '../../common/Image';
import {navbarInitialState} from './data';

const Navbar = () => {
  const [selected, setSelected] = useState(navbarInitialState);

  const handleSelected = name => {
    console.log(name);
  };

  return (
    <Container>
      {selected &&
        selected.map((value, index) => {
          return (
            <NavbarContents
              id={value.id}
              name={value.name}
              iconSrc={value.iconSrc}
              selected={value.selected}
              handleSelected={handleSelected}
            />
          );
        })}
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 38rem;
  padding: 2.4rem 0;
`;
