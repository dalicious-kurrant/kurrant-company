import axios from 'axios';
import DataLimitSelect from 'common/Pagination/Childs/DataLimitSelect';
import {
  calculatePageButtons,
  calculatePageMove,
  calculateTotalPages,
} from 'common/Pagination/Logics/PaginationLogics';
import Table from 'common/Table/Table';

import {userStatusFields, userStatusMockData} from 'data/userStatusData';

import {useState} from 'react';
import {useEffect} from 'react';
import {useQuery} from 'react-query';

import styled from 'styled-components';

const UserStatus = () => {
  const [page, setPage] = useState(1);

  // const [dataLimit, setDataLimit] = useAtom(dataLimitAtom);
  const [dataLimit, setDataLimit] = useState(1);

  // const

  // userStatusData 총 개수만 받기

  const {
    data: dataTotalPageCount,
    status2,
    isLoading2,
  } = useQuery(['getUserStatusLength'], async () => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );

    return response.data.length;
  });

  // 폐이지네이션 계산하기

  const {
    data: userStatusData,
    status,
    isLoading,
  } = useQuery(['getUserStatus', page, dataLimit], async ({queryKey}) => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );
    return response.data;
  });

  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    setPageList(
      calculatePageButtons(
        page,
        calculateTotalPages(dataTotalPageCount, dataLimit),
      ),
    );
  }, [page, dataTotalPageCount, dataLimit]);

  const handleButtonClick = e => {
    setPage(e.target.id);
  };

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  const handleGoToEdge = e => {
    setPage(e.target.id);
  };
  const handleMove = e => {
    setPage(
      calculatePageMove(
        e.target.id,
        page,
        calculateTotalPages(dataTotalPageCount, dataLimit),
      ),
    );

    // if (e.target.id === 'move-back') {
    //   setPage(calculatePageMove(e.target.id, page, calculateTotalPages(dataTotalPageCount, dataLimit)))

    // } else if (e.target.id === 'move-forward') {

    // }
  };

  return (
    <Container>
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
          id={calculateTotalPages(dataTotalPageCount, dataLimit)}
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

      {!!userStatusData && userStatusData.length !== 0 && (
        <Table
          tableFieldsInput={userStatusFields}
          tableDataInput={userStatusData}
          // tableDataInput={userStatusDataGet}
          // tableDataInput={userStatusMockData}
        />
      )}
    </Container>
  );
};

export default UserStatus;

const Container = styled.div``;
const ButtonWrap = styled.div``;
const Button = styled.button`
  color: ${props =>
    props.selected ? props.theme.colors.Blue04 : props.theme.colors.black};
`;
