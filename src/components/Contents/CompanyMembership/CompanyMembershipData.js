export const CompanyMembershipFields = {
  name: '사원 이름',
  email: '사원 이메일',
  phone: '사원 전화번호',
};

const inputType = {
  select: 'select',
  text: 'text',
};

export const CompanyMembershipFieldsData = [
  {
    fieldName: 'name',
    fieldNameKor: '사원 이름',
    placeholder: '예: 배수지',
    maxCharLength: 30,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },
  {
    fieldName: 'email',
    fieldNameKor: '사원 이메일',
    placeholder: '예: baesuzy123@naver.com',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },
  {
    fieldName: 'phone',
    fieldNameKor: '사원 전화번호',
    placeholder: '예: 010-1234-4321',
    maxCharLength: 30,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },
];
