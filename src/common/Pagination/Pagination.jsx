import styled from 'styled-components';

import DataLimitSelect from 'common/Pagination/Childs/DataLimitSelect';
import {calculateTotalPages} from 'common/Pagination/Logics/PaginationLogics';

const Pagination = ({
  dataTotalLength,
  page,
  setPage,
  dataLimit,
  setDataLimit,
  pageList,

  handleButtonClick,
  handleGoToEdge,
  handleMove,
}) => {
  return (
    <Container>
      <div>재사용 가능한 Pagination</div>

      <ButtonWrap>
        <button id={1} onClick={handleGoToEdge}>
          {'<<'}
        </button>
        <button id="move-back" onClick={handleMove}>
          {'<'}
        </button>

        {Array.isArray(pageList) &&
          !!pageList.length &&
          pageList.map((value, index) => {
            let selected = false;

            if (value == page) {
              selected = true;
            }

            return (
              <Button
                key={index}
                selected={selected}
                id={value}
                onClick={handleButtonClick}>
                {value}
              </Button>
            );
          })}

        <button id="move-forward" onClick={handleMove}>
          {'>'}
        </button>

        <button
          id={calculateTotalPages(dataTotalLength, dataLimit)}
          onClick={handleGoToEdge}>
          {'>>'}
        </button>
      </ButtonWrap>

      <DataLimitSelect
        currentValue={dataLimit}
        setDataLimit={setDataLimit}
        setPage={setPage}
        options={[1, 2, 4, 10]}
      />
    </Container>
  );
};

export default Pagination;

const Container = styled.div``;

const ButtonWrap = styled.div``;
const Button = styled.button`
  color: ${props =>
    props.selected ? props.theme.colors.Blue04 : props.theme.colors.black};
`;
