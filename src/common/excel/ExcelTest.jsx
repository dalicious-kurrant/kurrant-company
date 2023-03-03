import {TableCheckboxStatusAtom} from 'common/Table/store';
import {
  CompanyMembershipExelExportAtom,
  CompanyMembershipExelImportAtom,
} from 'components/Contents/CompanyMembership/store';
import {useSaveExelCorporation} from 'hooks/useCorporation';

import {useAtom} from 'jotai';
import {exelCompanyMembershipAtom} from 'jotai/compayMembership';
import {useRef} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {Button} from 'semantic-ui-react';
import styled from 'styled-components';
import {companyExelExport} from 'utils/downloadExel/exel';
import * as xlsx from 'xlsx';
import ExcelComponent from './ExcelComponent';
const C = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    padding-top: 100px;
    min-width: 1440px;
  `,
  Bread: styled.div`
    z-index: -1;
  `,
  BtnWrapper: styled.div``,
};
const ExcelTest = ({submitExelMutate}) => {
  const [plan, setPlan] = useAtom(exelCompanyMembershipAtom);
  const [checkboxStatus, setCheckboxStatus] = useAtom(TableCheckboxStatusAtom);
  console.log(checkboxStatus, '979');
  const [companyMembershipImportExcel, setCompanyMembershipImportExcel] =
    useAtom(CompanyMembershipExelImportAtom);
  const [companyMembershipExelExport, setCompanyMembershipExelExport] = useAtom(
    CompanyMembershipExelExportAtom,
  );
  // console.log(companyMembershipImportExcel, '-0966');
  const inputRef = useRef();
  const {mutateAsync: saveCorporation} = useSaveExelCorporation();
  const onUploadFileButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current.click();
  }, []);
  const readUploadFile = e => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target.result;
        const workbook = xlsx.read(data, {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(sheetName);
        // if (sheetName === '기업 가입 가능 리스트') {
        //   // if (sheetName === '고객 스팟 공지') {

        // }
        // console.log(json);
        const result = json.map(v => {
          const ret = {
            id: v.id,
            // groupId: v.groupId,
            // groupName: v.groupName,
            // email: v.employeeEmail,
            // name: v.employeeName,
            // phone: v.employeePhone,
            email: v.email,
            name: v.name,
            phone: v.phone,
          };
          // console.log(ret);
          return ret;
        });

        // 키값 집어 넣기

        const result1 = [
          {id: 'id', email: '이메일', name: '이름', phone: '전화번호'},
          ...result,
        ];

        // setPlan(result);
        // setPlan(result);
        // console.log(result);
        setCompanyMembershipImportExcel(result);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const onDownloadFile = async () => {
    if (plan && plan.length > 0) {
      // companyExelExport(plan);
    }
    if (companyMembershipExelExport && companyMembershipExelExport.length > 0) {
      companyExelExport(companyMembershipExelExport);
    }
  };

  const onSaveExel = async () => {
    const code = localStorage.getItem('code');
    // const req = [...plan];
    // req.shift();
    // const result = await submitExelMutate({saveList: req});
    // //alert('저장에 성공 하셨습니다.');
    // setPlan([]);
    // console.log(result);

    const saveUserList = [];
    if (companyMembershipImportExcel) {
      companyMembershipImportExcel.map(el => {
        // code: code,
        saveUserList.push({
          id: Number(el.id),
          name: el.name,
          email: el.email,
          phone: el.phone,
        });
      });
    }
    const data = {code: code, saveUserList};

    console.log(data, '-0i');
    try {
      await saveCorporation(data);
      return alert('저장에 성공 하셨습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <C.BtnWrapper>
        <Button
          color="green"
          icon="save"
          content="저장"
          onClick={() => {
            if (companyMembershipImportExcel.length !== 0) {
              onSaveExel();
            }
          }}
        />
        {/* <Button icon="history" content="히스토리" /> */}
        <Button.Group>
          <Button
            color="blue"
            inverted
            icon="file excel outline"
            content="엑셀 불러오기"
            onClick={onUploadFileButtonClick}
          />
          <InputExcel type="file" ref={inputRef} onChange={readUploadFile} />
          <Button.Or />
          <Button
            color="blue"
            icon="share"
            content="엑셀 내보내기"
            onClick={onDownloadFile}
          />
        </Button.Group>
      </C.BtnWrapper>
      {/* {plan && plan.length > 0 && <ExcelComponent />} */}
    </Container>
  );
};

export default ExcelTest;

const Container = styled.section``;

const InputExcel = styled.input`
  display: none;
`;
