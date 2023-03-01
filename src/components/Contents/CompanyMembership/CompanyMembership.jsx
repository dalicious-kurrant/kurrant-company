import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import Register from 'common/CRUD/Register/Register';
import useMutate from 'common/CRUD/useMutate';
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
import {CompanyMembershipDataAtom} from './store';
import useCompanyMembershipQuery from './useCompanyMembershipQuery';

const CompanyMembership = ({}) => {
  const [plan, setPlan] = useAtom(exelCompanyMembershipAtom);

  const {submitExelMutate} = useCompanyMembershipExelQuery();

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

  const {sendFinalMutate, deleteFinalMutate} = useCompanyMembershipQuery(
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
    handleCompanyMembershipDelete(
      checkboxStatus,
      tableDeleteList,
      companyMembershipData,
      setTableDeleteList,
      setCompanyMembershipData,
    );
  };

  // if (isLoading)
  //   return (
  //     <>
  //       {' '}
  //       <ExcelTest submitExelMutate={submitExelMutate} />
  //       <div>로딩중입니다..</div>{' '}
  //     </>
  //   );

  // if (status === 'error')
  //   return (
  //     <div>
  //       에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
  //       있어요
  //     </div>
  //   );

  return (
    <Container>
      <ExcelTest submitExelMutate={submitExelMutate} />
      {plan.length < 1 && (
        <>
          {companyMembershipData && (
            <div>
              <CRUDBundle
                handleBundleClick={handleBundleClick}
                showRegister={showRegister}
                sendFinal={() => {
                  sendFinal(
                    companyMembershipData,
                    sendFinalMutate,
                    checkboxStatus,
                    tableDeleteList,
                    deleteFinalMutate,
                  );
                }}
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
            {companyMembershipData && companyMembershipData.length > 0 && (
              <TableCustom
                fieldsInput={CompanyMembershipFields}
                dataInput={companyMembershipData}
              />
            )}
          </TableWrapper>
        </>
      )}
    </Container>
  );
};
export default CompanyMembership;

const Container = styled.section``;
