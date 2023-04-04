import {useGetExtraOrderList} from 'hooks/useAdditionalOrder';
import {useEffect} from 'react';
import {useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';

const History = () => {
  const day = new Date();
  const days = formattedWeekDate(day);
  const [startDate, setStartDate] = useState(days);
  const [endDate, setEndDate] = useState(days);
  const {data: extraList, refetch} = useGetExtraOrderList(startDate, endDate);
  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  console.log(extraList);
  useEffect(() => {
    refetch();
  }, [startDate, endDate, refetch]);

  return (
    <Wrapper>
      <div>
        <DateInput
          type="date"
          defaultValue={startDate}
          onChange={e => getStartDate(e)}
        />
        <DateSpan>-</DateSpan>
        <DateInput
          type="date"
          defaultValue={endDate}
          onChange={e => getEndDate(e)}
        />
      </div>
      <TableWrapper>
        <div style={{marginTop: 12}}>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  요청 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  상세 스팟
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">사용목적</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">단가</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">총 금액</Table.HeaderCell>
                <Table.HeaderCell textAlign="center"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {extraList?.data?.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center">{el.serviceDate}</Table.Cell>
                    <Table.Cell textAlign="center">
                      2023-03-18 23:00:00
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.groupName}</Table.Cell>
                    <Table.Cell textAlign="center">{el.spotName}</Table.Cell>
                    <Table.Cell textAlign="center">{el.usage}</Table.Cell>
                    <Table.Cell textAlign="center">육개장</Table.Cell>
                    <Table.Cell textAlign="center">{el.price}</Table.Cell>
                    <Table.Cell textAlign="center">{el.count}</Table.Cell>
                    <Table.Cell textAlign="center">{el.totalPrice}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button content="취소" color="red" size="large" />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </TableWrapper>
    </Wrapper>
  );
};
export default History;

const Wrapper = styled.div`
  margin-top: 24px;
`;

const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-top: 4px;
`;

const DateSpan = styled.span`
  margin: 0px 4px;
`;
