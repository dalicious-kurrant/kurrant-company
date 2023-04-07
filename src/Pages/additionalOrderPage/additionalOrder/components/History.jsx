import {
  useGetExtraOrderList,
  useRefundExtraOrder,
} from 'hooks/useAdditionalOrder';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';
import {historyEndDateAtom, historyStartDateAtom} from 'utils/store';
import withCommas from 'utils/withCommas';

const History = () => {
  const [startDate, setStartDate] = useAtom(historyStartDateAtom);
  const [endDate, setEndDate] = useAtom(historyEndDateAtom);
  const {data: extraList, refetch} = useGetExtraOrderList(startDate, endDate);
  const {mutateAsync: refundExtraOrder} = useRefundExtraOrder();
  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const refundOrder = async id => {
    await refundExtraOrder({id: id});
  };

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
                <Table.HeaderCell textAlign="center">
                  식단 상태
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  주문 상태
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {extraList?.data?.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center">{el.serviceDate}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.createdDateTime}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.groupName}</Table.Cell>
                    <Table.Cell textAlign="center">{el.spotName}</Table.Cell>
                    <Table.Cell textAlign="center">{el.usage}</Table.Cell>
                    <Table.Cell textAlign="center">{el.foodName}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {withCommas(el.price)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.count}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {withCommas(el.totalPrice)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.dailyFoodStatus}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.orderStatus === '취소' ? (
                        <CancelText>취소</CancelText>
                      ) : el.orderStatus === '결제완료' &&
                        el.dailyFoodStatus === '판매중' ? (
                        <Button
                          content="취소"
                          color="red"
                          size="large"
                          onClick={() => refundOrder(el.orderItemDailyFoodId)}
                        />
                      ) : (
                        el.orderStatus
                      )}
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

const CancelText = styled.div`
  font-weight: 600;
  color: #dd5257;
`;
