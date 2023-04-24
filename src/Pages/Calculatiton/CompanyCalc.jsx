import {useEffect, useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';

import {Dropdown, Table} from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import ExcelIcon from '../../assets/icon/excel.svg';
import PDFIcon from '../../assets/icon/pdfIcon.svg';

import {
  selectClientAtom,
  selectModifyAtom,
  selectStatusAtom,
} from 'utils/store';
import {useAtom} from 'jotai';
import CompanyFilter from './components/CompanyFilter';

const CompanyCalc = () => {
  const navigate = useNavigate();
  const form = useForm();

  const [selectClient] = useAtom(selectClientAtom);
  const [selectStatus] = useAtom(selectStatusAtom);
  const [selectModify] = useAtom(selectModifyAtom);
  console.log(selectModify);
  const {watch} = form;

  const date = watch('month');

  const year = date && date.split('-')[0];
  const month = date && date.split('-')[1];

  const yearData = year && `year=${year}`;
  const monthData = month && `&month=${month}`;
  const makersId =
    selectClient.length === 0 ? undefined : `&makersIds=${selectClient}`;
  const status = `&status=${selectStatus}`;
  const hasRequest = selectModify === 0 ? '' : `&hasRequest=${selectModify}`;

  const params = {
    year: yearData ?? '',
    month: monthData ?? '',
    makersIds: makersId ?? '',
    status: status === '&status=undefined' ? '' : status,
    hasRequest: hasRequest,
  };
  console.log(params, 'component');

  const statusData = [
    {key: 0, text: '정산 신청 완료', value: 0},
    {key: 1, text: '거래명세서 확정 대기', value: 1},
    {key: 2, text: '정산금 입금 완료', value: 2},
  ];

  const goToPage = (id, name) => {
    navigate('/calc/makersCalc/detail', {
      state: {
        makersId: id,
        name: name,
      },
    });
    // setOrderNumber(code);
  };

  // useEffect(() => {
  //   refetch();
  // }, [refetch, yearData, monthData, selectClient, selectStatus, hasRequest]);
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
          {/* {makersAdjustList?.data?.map(v => {
            console.log(v);
            return (
              <Table.Row key={v.id} style={{cursor: 'pointer'}}>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v?.year}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v?.month}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v?.makersName}
                </Table.Cell>
                <Table.Cell
                  onClick={() => goToPage(v.id, v.makersName)}></Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v.accountHolder}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v.nameOfBank}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v.accountNumber}
                </Table.Cell>
                <Table.Cell>
                  <InputBlock>
                    <Dropdown
                      placeholder="상태"
                      fluid
                      selection
                      search
                      options={statusData}
                      value={adjustReverseStatusFomatted(v.paycheckStatus)}
                      onChange={async (e, data) => {
                        console.log(data.value);
                        await updateStatus({
                          id: data.value,
                          status: [v.id],
                        });
                      }}
                    />
                  </InputBlock>
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{maxWidth: 130}}></Table.Cell>
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
          })} */}
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
  width: 80%;
`;
