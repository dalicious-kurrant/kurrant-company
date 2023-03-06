import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';
import useMutate from 'common/CRUD/useMutate';
import ExcelComponent from 'common/excel/ExcelComponent';
import ExcelTest from 'common/excel/ExcelTest';
import {TableCheckboxStatusAtom, TableDeleteListAtom} from 'common/Table/store';
import TableCustom from 'common/Table/TableCustom';

import useCompanyMembershipExelQuery from 'hooks/ReactQueryHooks/useCompanyMembershipExelQuery';

import {useAtom} from 'jotai';
import {exelCompanyMembershipAtom} from 'jotai/compayMembership';

import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {TableWrapper} from 'style/common.style';

import styled from 'styled-components';
import {clickButtonBundle} from '../Logics/Logics';
import {
  CompanyMembershipFields,
  CompanyMembershipFieldsData,
} from './CompanyMembershipData';
import {
  handleCompanyMembershipDelete,
  sendFinal,
} from './CompanyMembershipLogics';
import {
  CompanyMembershipDataAtom,
  CompanyMembershipExelExportAtom,
  CompanyMembershipExelImportAtom,
} from './store';
import useCompanyMembershipQuery from './useCompanyMembershipQuery';

const CompanyMembership = ({}) => {
  // const [plan, setPlan] = useAtom(exelCompanyMembershipAtom);
  const [importData, setImportData] = useAtom(CompanyMembershipExelImportAtom);

  const {submitExelMutate} = useCompanyMembershipExelQuery();
  const [exelExport, setExelExport] = useAtom(CompanyMembershipExelExportAtom);
  const [companyMembershipData, setCompanyMembershipData] = useAtom(
    CompanyMembershipDataAtom,
  );
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});
  const [registerStatus, setRegisterStatus] = useState('register');

  const [tableDeleteList, setTableDeleteList] = useAtom(TableDeleteListAtom);

  const {deleteMutate, submitMutate, editMutate} = useMutate(
    CompanyMembershipDataAtom,
  );

  const token = localStorage.getItem('token');

  const {isLoading, status, sendFinalMutate, deleteFinalMutate} =
    useCompanyMembershipQuery(
      ['getCompanyMembershipJSON'],
      CompanyMembershipDataAtom,
      token,
    );

  const handleBundleClick = buttonStatus => {
    clickButtonBundle(
      buttonStatus,
      CompanyMembershipFields,
      companyMembershipData,
      checkboxStatus,
      setDataToEdit,
      setRegisterStatus,
      setShowRegister,
      deleteMutate,
    );
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  useEffect(() => {
    return () => {
      setCheckboxStatus({});
      setTableDeleteList([]);
    };
  }, []);

  const handleDelete = () => {
    // 삭제할 값들의 id골라내기

    let deleteIdArray = [];
    let list = [...companyMembershipData];

    // parent 빼내기
    const {parent, ...checkList} = checkboxStatus;

    Object.entries(checkList).forEach(v => {
      if (v[1] === true) {
        // console.log(v[0]);

        const deleteData = list.find(val => val.id === parseInt(v[0]));
        // console.log(deleteData);
        deleteIdArray.push(deleteData.id);
      }
    });

    if (window.confirm(`${deleteIdArray.toString()}를 삭제하시겠습니까?`)) {
      const input = {
        waitMemberIdList: deleteIdArray,
      };

      deleteFinalMutate(input);
    } else {
      return;
    }
  };

  useEffect(() => {
    // console.log(companyMembershipData);
    setExelExport(companyMembershipData);
  }, [companyMembershipData, setExelExport]);

  // useEffect(() => {
  //   console.log(importData);
  //   console.log(importData.length);
  // }, [importData]);

  const bool1 = companyMembershipData && companyMembershipData.length > 0;
  const bool2 = importData && importData.length > 0;

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (companyMembershipData.length < 1)
    return (
      <>
        <div>데이터가 아직 없습니다. 데이터를 추가해주세요.</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return (
    <Container>
      <ExcelTest submitExelMutate={submitExelMutate} />

      <>
        {companyMembershipData && (
          <div>
            <CRUDBundle
              handleBundleClick={handleBundleClick}
              showRegister={showRegister}
              sendDelete={handleDelete}
              checkboxStatus={checkboxStatus}
            />

            {showRegister && (
              <Register
                registerStatus={registerStatus}
                submitMutate={submitMutate}
                editMutate={editMutate}
                handleClose={handleClose}
                data={dataToEdit}
                fieldsToOpen={CompanyMembershipFields}
                fieldsData={CompanyMembershipFieldsData}
              />
            )}
          </div>
        )}

        <TableWrapper>
          {(bool1 || bool2) && (
            <TableCustom
              fieldsInput={CompanyMembershipFields}
              dataInput={
                importData.length > 0 ? importData : companyMembershipData
              }
            />
          )}
        </TableWrapper>
      </>
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.section``;
