import {useAtom} from 'jotai';
import {useState} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {formattedWeekDate, formattedWeekDateZ} from 'utils/dateFormatter';
import {
  extraEndDateAtom,
  extraListDataAtom,
  extraStartDateAtom,
} from 'utils/store';
import Input from 'components/input/Input';
import Select from 'react-select';
import {useGetExstraOrder, useGetSpotList} from 'hooks/useAdditionalOrder';
import {useEffect} from 'react';
import withCommas from 'utils/withCommas';

const AddOrder = () => {
  const [startDate, setStartDate] = useAtom(extraStartDateAtom);
  const [endDate, setEndDate] = useAtom(extraEndDateAtom);
  const [extraListData, setExtraListData] = useAtom(extraListDataAtom);
  const [spotOption, setSpotOption] = useState();
  const [sendData, setSendData] = useState([]);
  const [test, setTest] = useState();
  const [detailSpotOption, setDetailSpotOption] = useState();
  const {data: extraList, refetch} = useGetExstraOrder(startDate, endDate);
  const {data: spotList, refetch: spotFetch} = useGetSpotList(spotOption);
  const getStartDate = e => {
    setStartDate(e.target.value);
  };
  const getEndDate = e => {
    setEndDate(e.target.value);
  };

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue, control} = form;
  const inputWatch = watch();

  const detailSpotArr = spotList?.data?.map(el => {
    return {
      value: el.spotId,
      label: el.spotName,
    };
  });
  const onSubmit = () => {
    const reqData = extraListData.filter(
      extra =>
        extra.totalPrice &&
        extra.totalPrice > 0 &&
        extra.groupId &&
        extra.spotId &&
        extra.usage,
    );
    console.log(reqData);
  };
  const extraOrder = (props, countValue) => {
    if (props.usage !== undefined && countValue !== undefined) {
      setSendData(prev => [...prev, props]);
    }
    console.log(sendData);
  };
  useEffect(() => {
    let retArray = [];
    extraList?.data.map(v => {
      v.dailyFoods.map(daily => {
        retArray.push({
          serviceDate: v.serviceDate,
          diningType: v.diningType,
          foodId: daily.foodId,
          price: daily.price,
        });
      });
    });

    setExtraListData(retArray);
  }, [extraList?.data, setExtraListData]);

  useEffect(() => {
    refetch();
  }, [startDate, endDate, refetch]);
  useEffect(() => {
    spotFetch();
  }, [spotFetch, spotOption]);

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
      {/* <TableWrapper style={{height: '100vh'}}> */}
      <div style={{marginTop: 12}}>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">요청 날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상세 스팟</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">사용목적</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">단가</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">총 금액</Table.HeaderCell>
              <Table.HeaderCell textAlign="center"></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">2023-03-20</Table.Cell>
              <Table.Cell textAlign="center">2023-03-18 23:00:00</Table.Cell>
              <Table.Cell textAlign="center">롯데월드</Table.Cell>
              <Table.Cell textAlign="center">롯데타워 23층</Table.Cell>
              <Table.Cell textAlign="center">손님</Table.Cell>
              <Table.Cell textAlign="center">육개장</Table.Cell>
              <Table.Cell textAlign="center">8000</Table.Cell>
              <Table.Cell textAlign="center">3</Table.Cell>
              <Table.Cell textAlign="center">24000</Table.Cell>
              <Table.Cell textAlign="center">
                <Button content="취소" color="red" size="large" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div style={{marginTop: 48}}>
        <div>추가주문 가능 식단</div>

        <FormProvider {...form}>
          <Button
            content="추가"
            color="blue"
            size="large"
            onClick={form.handleSubmit(onSubmit)}
          />
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  다이닝타입
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">상품</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">가격</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  구매 가능 수량
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  상세 스팟
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  사용 목적
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">수량</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">총액</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {extraList?.data?.map((el, idx) => {
                return el.dailyFoods.map((v, i) => {
                  // console.log(el, v, '01');
                  const groupArr = v.groupList.map(el => {
                    return {
                      value: el.groupId,
                      label: el.groupName,
                    };
                  });

                  const usageValue = inputWatch[v.foodId];
                  const countValue =
                    inputWatch[`${v.foodId}${el.serviceDate}count`];

                  return (
                    <Table.Row key={v.foodId}>
                      {
                        <Table.Cell
                          //rowSpan={el.dailyFoods.length}
                          textAlign="center"
                          verticalAlign="middle">
                          <InnerCell>{el.serviceDate}</InnerCell>
                        </Table.Cell>
                      }

                      <Table.Cell textAlign="center">
                        <InnerCell>{el.diningType}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{v.foodName}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{withCommas(v.price)}원</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{v.foodCapacity}개</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Controller
                          control={control}
                          name={`${v.foodId}${el.serviceDate}groupId`}
                          render={({field}) => {
                            return (
                              <SelectBox
                                // {...field}
                                // value={field.value || ''}
                                // ref={groupRef}
                                options={groupArr}
                                placeholder="스팟"
                                // defaultValue={defaultGroup}
                                onChange={e => {
                                  console.log(e.value);
                                  setExtraListData(
                                    extraListData.map(extra => {
                                      if (
                                        extra.foodId === v.foodId &&
                                        el.serviceDate === extra.serviceDate
                                      ) {
                                        return {
                                          ...extra,
                                          groupId: e.value,
                                        };
                                      }
                                      return extra;
                                    }),
                                  );
                                  setSpotOption(e.value);
                                  return field.onChange(e.value);
                                }}
                              />
                            );
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Controller
                          control={control}
                          name={`${v.foodId}${el.serviceDate}spotId`}
                          render={({field}) => {
                            return (
                              <SelectBox
                                // {...field}
                                // value={field.value || ''}
                                // ref={groupRef}
                                options={detailSpotArr}
                                placeholder="상세스팟"
                                // defaultValue={defaultGroup}
                                onChange={e => {
                                  console.log(e.value);
                                  setExtraListData(
                                    extraListData.map(extra => {
                                      if (
                                        extra.foodId === v.foodId &&
                                        el.serviceDate === extra.serviceDate
                                      ) {
                                        return {
                                          ...extra,
                                          spotId: e.value,
                                        };
                                      }
                                      return extra;
                                    }),
                                  );
                                  setDetailSpotOption(e.value);
                                  return field.onChange(e.value);
                                }}
                              />
                            );
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>
                          <Controller
                            control={control}
                            name={`${v.foodId}${el.serviceDate}`}
                            render={({field}) => {
                              return (
                                <Input
                                  {...field}
                                  value={field.value || ''}
                                  type="text"
                                  onChange={e => {
                                    setExtraListData(
                                      extraListData.map(extra => {
                                        if (
                                          extra.foodId === v.foodId &&
                                          el.serviceDate === extra.serviceDate
                                        )
                                          return {
                                            ...extra,
                                            usage: e.target.value,
                                          };
                                        return extra;
                                      }),
                                    );
                                    return field.onChange(e.target.value);
                                  }}
                                  width="150px"
                                />
                              );
                            }}
                          />
                        </InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>
                          <Controller
                            control={control}
                            name={`${v.foodId}${el.serviceDate}count`}
                            render={({field}) => {
                              return (
                                <Input
                                  {...field}
                                  value={field.value || ''}
                                  type="number"
                                  rules={{
                                    pattern: {
                                      value: /^[0-9]+$/,
                                    },
                                  }}
                                  onChange={e => {
                                    setExtraListData(
                                      extraListData.map(extra => {
                                        if (
                                          extra.foodId === v.foodId &&
                                          el.serviceDate === extra.serviceDate
                                        )
                                          return {
                                            ...extra,
                                            count: parseInt(e.target.value),
                                            totalPrice:
                                              (countValue ?? 0) * v.price,
                                          };
                                        return extra;
                                      }),
                                    );
                                    return field.onChange(
                                      parseInt(e.target.value),
                                    );
                                  }}
                                  width="150px"
                                />
                              );
                            }}
                          />
                        </InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>
                          {(countValue ?? 0) * v.price === 0
                            ? '0'
                            : withCommas((countValue ?? 0) * v.price)}
                          원
                        </InnerCell>
                      </Table.Cell>
                    </Table.Row>
                  );
                });
              })}
            </Table.Body>
          </Table>
        </FormProvider>
      </div>
      {/* </TableWrapper> */}
    </Wrapper>
  );
};
export default AddOrder;

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
const InnerCell = styled.div`
  white-space: nowrap;
`;

const SelectBox = styled(Select)`
  /* width: 200px; */
  margin-top: 4px;
`;
