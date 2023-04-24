import {Label, Table} from 'semantic-ui-react';
import styled from 'styled-components';

const ClientMeal = () => {
  return (
    <Wrap>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={6}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              식수 개요
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <TableCell textAlign="center">메이커스 이름</TableCell>
            <Table.Cell textAlign="center">ㅇㄹㅇㄹㅇㄹ</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">기간</TableCell>
            <Table.Cell textAlign="center">ㅇㄹㅇㄹ</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">아침 총 식수</TableCell>
            <Table.Cell textAlign="center">ㅇㄹㅇㄹ</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">점심 총 식수</TableCell>
            <Table.Cell textAlign="center">ㅇㄹㅇㄹ</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">저녁 총 식수</TableCell>
            <Table.Cell textAlign="center">ㅇㄹㅇㄹ</Table.Cell>
          </Table.Row>
          <Table.Row>
            <TableCell textAlign="center">총액(VAT 포함)</TableCell>
            <Table.Cell textAlign="center">ㅇㄹㅇㄹ</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              colSpan={8}
              style={{
                backgroundColor: '#bdbac1',
                paddingTop: 6,
                paddingBottom: 6,
              }}>
              식수 내역
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">식사타입</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">사용 지원금</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">개수</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">구매자</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">이메일</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    </Wrap>
  );
};

export default ClientMeal;

const TableCell = styled(Table.Cell)`
  background-color: ${({theme}) => theme.colors.grey[8]};
`;

const Wrap = styled.div`
  margin-top: 24px;
  width: 70%;
`;
