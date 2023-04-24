import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {Button, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {
  endMonthAtom,
  selectClientAtom,
  selectModifyAtom,
  selectStatusAtom,
  startMonthAtom,
} from 'utils/store';

const CompanyFilter = () => {
  const [startMonth, setStartMonth] = useAtom(startMonthAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthAtom);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [selectClient, setSelectClient] = useAtom(selectClientAtom);
  const [selectStatus, setSelectStatus] = useAtom(selectStatusAtom);
  const [selectModify, setSelectModify] = useAtom(selectModifyAtom);
  // const {data: makersList} = useMakersList();

  const statusData = [
    {key: 0, text: '전체', value: 99},
    {key: 1, text: '정산 신청 완료', value: 0},
    {key: 2, text: '거래명세서 확정대기', value: 1},
    {key: 3, text: '추가요청 처리완료', value: 2},
    {key: 4, text: '거래명세서 확정', value: 3},
    {key: 5, text: '정산금 입금 완료', value: 4},
  ];

  const modifyStatus = [
    {key: 0, text: '전체', value: 0},
    {key: 1, text: '있음', value: true},
    {key: 2, text: '없음', value: false},
  ];

  // useEffect(() => {
  //   setGroupInfoList(
  //     makersList?.data.map(v => {
  //       return {key: v.makersId, text: v.makersName, value: v.makersId};
  //     }),
  //   );
  // }, [makersList]);
  return (
    <Wrap>
      <InputBlock>
        <InputBox
          placeholder="월"
          type="month"
          value={startMonth}
          onChange={e => setStartMonth(e.target.value)}
        />
      </InputBlock>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        -
      </div>
      <InputBlock>
        <InputBox
          placeholder="월"
          type="month"
          value={endMonth}
          onChange={e => setEndMonth(e.target.value)}
        />
      </InputBlock>
      <InputBlock>
        {groupInfoList && (
          <Dropdown
            placeholder="스팟(고객사)"
            fluid
            selection
            search
            multiple
            options={groupInfoList}
            value={selectClient}
            onChange={(e, data) => {
              setSelectClient(data.value);
            }}
          />
        )}
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="상태"
          fluid
          selection
          search
          options={statusData}
          value={selectStatus}
          onChange={(e, data) => {
            setSelectStatus(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="수정요청"
          fluid
          selection
          search
          options={modifyStatus}
          value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Button content="필터초기화" color="blue" />
      </InputBlock>
    </Wrap>
  );
};

export default CompanyFilter;
const InputBox = styled.input`
  display: flex;
  padding-top: 9px;
  padding-bottom: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
  //text-align: end;
  //padding-right: 8px;
  text-align: center;
  width: 100%;

  :nth-child(1) {
    margin-right: 24px;
  }
`;

const InputBlock = styled.div`
  min-width: 200px;
  font-size: 14px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MonthWrap = styled.div`
  display: flex;

  width: 400px;
`;
