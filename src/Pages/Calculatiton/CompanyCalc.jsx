import {useEffect, useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';

import {Dropdown, Table} from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import ExcelIcon from '../../assets/icon/excel.svg';
import PDFIcon from '../../assets/icon/pdfIcon.svg';

import CompanyFilter from './components/CompanyFilter';
import {
  endMonthAtom,
  selectClientAtom,
  selectModifyAtom,
  selectStatusAtom,
  startMonthAtom,
} from 'utils/store';
import {useAtom} from 'jotai';
import {useGetAdjustList} from 'hooks/useAdjustment';
import withCommas from 'utils/withCommas';

const CompanyCalc = () => {
  const navigate = useNavigate();

  const [startMonth, setStartMonth] = useAtom(startMonthAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthAtom);
  const [selectClient, setSelectClient] = useAtom(selectClientAtom);
  const [selectStatus, setSelectStatus] = useAtom(selectStatusAtom);
  const [selectModify, setSelectModify] = useAtom(selectModifyAtom);

  const start = startMonth?.split('-')[0] + startMonth?.split('-')[1];
  const end = endMonth?.split('-')[0] + endMonth?.split('-')[1];

  const {data: spotsAdjustList, refetch} = useGetAdjustList(
    start,
    end,
    selectClient,
    selectStatus,
    selectModify,
  );

  const goToPage = (id, name) => {
    navigate('/calc/detail', {
      state: {
        groupId: id,
        name: name,
      },
    });
    // setOrderNumber(code);
  };
  useEffect(() => {
    refetch();
  }, [refetch, startMonth, endMonth, selectClient, selectStatus, selectModify]);
  return (
    <Wrap>
      <div style={{marginBottom: 24}}>
        <h1>정산 관리</h1>
      </div>
      <CompanyFilter />

      <Table celled style={{marginTop: 48}} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">스팟(고객사)</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">선금</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">수정요청</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {spotsAdjustList?.data?.map(v => {
            return (
              <Table.Row key={v.id} style={{cursor: 'pointer'}}>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v?.year}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v?.month}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v?.corporationName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {withCommas(v.prepaidPrice)}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {withCommas(v.price)}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v.paycheckStatus}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v.hasRequest ? '있음' : '없음'}
                </Table.Cell>

                <Table.Cell textAlign="center">
                  {v.excelFile ? (
                    <Link to={v.excelFile}>
                      <InputImage alt="ExcelIcon" src={ExcelIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.pdfFile ? (
                    <Link to={v.pdfFile}>
                      <InputImage alt="PDFIcon" src={PDFIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Wrap>
  );
};

export default CompanyCalc;
const InputImage = styled.img`
  width: 40px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;

const InputBlock = styled.div`
  max-width: 180px;
  font-size: 14px;
`;

const Wrap = styled.div`
  width: 90%;
`;
