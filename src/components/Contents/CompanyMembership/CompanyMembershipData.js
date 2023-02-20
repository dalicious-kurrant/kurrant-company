export const CompanyMembershipFields = {
  // userId: '아이디',
  // groupId: '그룹아이디',
  // groupName: '그룹이름',
  employeeName: '사원 이름',
  employeeEmail: '사원 이메일',
  employeePhone: '사원 전화번호',
};

export const CompanyMembershipRegisterFields = [
  // userId: '아이디',
  // groupId: '그룹아이디',
  // groupName: '그룹이름',

  {
    fieldName: 'employeeName',
    fieldNameKor: '사원 이름',
    placeholder: '예: 배수지',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'employeeEmail',
    fieldNameKor: '사원 이메일',
    placeholder: '예: baesuzy123@naver.com',
    maxCharLength: 30,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'employeePhone',
    fieldNameKor: '사원 전화번호',
    placeholder: '예: 010-1234-4321',
    maxCharLength: 13,
    flex: 1,
    width: undefined,
  },
];

export const CompanyMembershipMockData = [
  {
    id: 1,
    userId: '아이디여~',
    groupId: 'g그룹 아이디여~',
    groupName: '그룹이름이여~~',
    employeeEmail: '이메일이여~~',
    employeeName: '직원이름이여~~',
    employeePhone: '전화번호여~~~',
  },
  {
    id: 2,
    userId: '아이디여124~',
    groupId: 'g그룹 아이디여~',
    groupName: '그룹이름이여~~',
    employeeEmail: '이메일이여~~',
    employeeName: '직원이름이여~~',
    employeePhone: '전화번호여~~~',
  },
  {
    id: 3,
    userId: '아이디124여~',
    groupId: 'g그룹 아이디여~',
    groupName: '그룹이름이여~~',
    employeeEmail: '이메일이여~~',
    employeeName: '직원이름이여~~',
    employeePhone: '전화번호여~~~',
  },
  {
    id: 4,
    userId: '아이디1여~',
    groupId: 'g그룹 아이디여~',
    groupName: '그룹이름이여~~',
    employeeEmail: '이메일이여~~',
    employeeName: '직원이름이여~~',
    employeePhone: '전화번호여~~~',
  },
  {
    id: 5,
    userId: '아이디여~',
    groupId: 'g그룹 아이디여~',
    groupName: '그룹이름이여~~',
    employeeEmail: '이메일이여~~',
    employeeName: '직원이름이여~~',
    employeePhone: '전화번호여~~~',
  },
];
