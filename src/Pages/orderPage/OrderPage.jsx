import {useAtom} from 'jotai';
import {Table, TableHeader} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {
  endDateAtom,
  startDateAtom,
  userOptionAtom,
  diningTypeOptionAtom,
  spotOptionAtom,
} from 'utils/store';
import Select from 'react-select';
import {useGetGroupInformation} from 'hooks/useOrder';
import {useGetOrderList} from '../../hooks/useOrder';
import {useEffect, useState} from 'react';
import withCommas from '../../utils/withCommas';
import {useNavigate} from 'react-router-dom';

const OrderPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useAtom(startDateAtom);
  const [endDate, setEndDate] = useAtom(endDateAtom);
  const {data: groupList} = useGetGroupInformation();

  const [userOption, setUserOption] = useState('');
  const [spotOption, setSpotOption] = useState('');
  const [diningTypeOption, setDiningTypeOption] = useState('');

  const [defaultUser, setDefaultUser] = useAtom(userOptionAtom);
  const [defaultSpot, setDefaultSpot] = useAtom(spotOptionAtom);
  const [defaultDining, setDefaultDining] = useAtom(diningTypeOptionAtom);

  const userArr = groupList?.data?.users?.map(el => {
    return {
      value: el.userId,
      label: el.userName,
    };
  });

  const spotArr = groupList?.data?.spots?.map(el => {
    return {
      value: el.spotId,
      label: el.spotName,
    };
  });

  const typeArr = groupList?.data?.diningTypes?.map(el => {
    return {
      value: el.code,
      label: el.diningType,
    };
  });

  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const goToPage = code => {
    navigate('orderDetail/' + code, {
      state: {
        orderCode: code,
      },
    });
  };

  const user = userOption && `&userId=${userOption}`;
  const spots = spotOption && `&spots=${spotOption}`;
  const diningTypecode =
    diningTypeOption && `&diningTypeCode=${diningTypeOption}`;
  const params = {
    user: user && user,
    spots: spots && spots,
    type: diningTypecode && diningTypecode,
  };
  const {data: orderList, refetch} = useGetOrderList(
    startDate,
    endDate,
    params,
  );
  console.log(orderList);
  useEffect(() => {
    refetch();
  }, [startDate, endDate, user, spots, diningTypecode, refetch]);
  return (
    <div>
      <h1>주문 현황</h1>

      <label>서비스일 날짜</label>
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
      <SelectBoxWrapper>
        <div>
          <span>유저</span>
          <SelectBox
            // ref={userRef}
            options={userArr}
            placeholder="유저"
            // defaultValue={defaultUser}
            onChange={e => {
              if (e) {
                setUserOption(e.value);
                setDefaultUser(e);
              } else {
                setUserOption('');
              }
            }}
          />
        </div>
        <div>
          <span>스팟 선택</span>
          <SelectBox
            // ref={spotRef}
            options={spotArr}
            placeholder="스팟 선택"
            // defaultValue={defaultSpot}
            onChange={e => {
              if (e) {
                setSpotOption(e.value);
                setDefaultSpot(e);
              } else {
                setSpotOption('');
              }
            }}
          />
        </div>
        <div>
          <span>식사타입</span>
          <SelectBox
            // ref={diningRef}
            options={typeArr}
            placeholder="식사타입"
            // defaultValue={defaultDining}
            onChange={e => {
              if (e) {
                setDiningTypeOption(e.value);
                setDefaultDining(e);
              } else {
                setDiningTypeOption('');
              }
            }}
          />
        </div>
      </SelectBoxWrapper>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">그룹 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">스팟 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">유저 이름</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">식사 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송 시간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">주문 상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                메이커스 이름
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={2}>
                상품 이름
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">최종 가격</Table.HeaderCell>
              <Table.HeaderCell textAlign="center" width={3}>
                오더 번호
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderList?.data?.orderItemDailyFoods?.map((v, idx) => {
              return (
                <TableRow
                  onClick={() => goToPage(v.orderCode)}
                  key={v.orderCode + idx}>
                  <Table.Cell textAlign="center">{v.serviceDate}</Table.Cell>
                  <Table.Cell textAlign="center">{v.groupName}</Table.Cell>
                  <Table.Cell textAlign="center">{v.spotName}</Table.Cell>
                  <Table.Cell textAlign="center">{v.userName}</Table.Cell>
                  <Table.Cell textAlign="center">{v.phone}</Table.Cell>
                  <Table.Cell textAlign="center">{v.diningType}</Table.Cell>
                  <Table.Cell textAlign="center">{v.deliveryTime}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {v.orderStatus === '취소' ? (
                      <OrderCancel>{v.orderStatus}</OrderCancel>
                    ) : (
                      v.orderStatus
                    )}
                  </Table.Cell>
                  <Table.Cell>{v.makers}</Table.Cell>
                  <Table.Cell>{v.foodName}</Table.Cell>
                  <Table.Cell textAlign="center">{v.count}</Table.Cell>
                  <Table.Cell textAlign="right">
                    {withCommas(v.price)}원
                  </Table.Cell>
                  <Table.Cell>{v.orderCode}</Table.Cell>
                </TableRow>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrapper>
    </div>
  );
};

export default OrderPage;

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

const SelectBoxWrapper = styled.div`
  display: flex;
  margin: 24px 0px 24px 0px;
  width: 80%;
  justify-content: space-between;
`;

const SelectBox = styled(Select)`
  width: 250px;
  margin-top: 4px;
`;

const OrderCancel = styled.span`
  color: #dd5257;
`;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;