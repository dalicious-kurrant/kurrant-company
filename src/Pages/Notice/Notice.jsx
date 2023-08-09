import {noticeApis} from 'api/notice';
import {useNoticeLoad} from 'hooks/useNotice';
import {useAtom} from 'jotai';
import {useState} from 'react';
import {Pagination, Table} from 'semantic-ui-react';
import {noticePageAtom} from 'utils/store';
import Filter from './Filter';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {boardTypeFormatted} from 'utils/boardTypeFormatter';

const Notice = () => {
  const navigate = useNavigate();
  const [page, setPage] = useAtom(noticePageAtom);
  const [touch, setTouch] = useState(99);
  const [totalPage, setTotalPage] = useState();
  const {data: noticeList, refetch} = useNoticeLoad(page, touch);
  console.log(touch);

  const goToDetailage = el => {
    navigate('/Notice/Detail', {state: el});
  };

  useEffect(() => {
    refetch();
  }, [page, refetch, touch]);

  useEffect(() => {
    if (noticeList?.data?.items) {
      setTotalPage(noticeList?.data?.total);
    }
  }, [noticeList?.data]);

  return (
    <div>
      <h1>공지사항</h1>
      <Filter touch={touch} setTouch={setTouch}></Filter>
      <Table size={'small'} celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>카테고리</Table.HeaderCell>
            <Table.HeaderCell>제목</Table.HeaderCell>
            <Table.HeaderCell>날짜</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {noticeList?.data?.items?.length !== 0 ? (
            noticeList?.data?.items?.map(el => {
              return (
                <Table.Row
                  textAlign="center"
                  key={el.id}
                  onClick={() => goToDetailage(el)}
                  style={{cursor: 'pointer'}}>
                  <Table.Cell width={1}>
                    {boardTypeFormatted(el.boardType)}
                  </Table.Cell>
                  <Table.Cell width={8}>{el.title}</Table.Cell>
                  <Table.Cell width={1}>{el.created}</Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell textAlign="center">공지사항이 없습니다.</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div>
        <Pagination
          ellipsisItem={null}
          defaultActivePage={page}
          totalPages={totalPage}
          boundaryRange={1}
          onPageChange={(e, data) => {
            setPage(data.activePage);
          }}
        />
      </div>
    </div>
  );
};

export default Notice;
