export const handleSpotInfoError = inputData => {
  const data = [...inputData];

  // 필수선택
  // spotId: num(정해진 번호),
  // spotName : str(정해진 스트링),
  // groupId, groupName
  // diningType : 아침, 점심, 저녁 적어도 하나

  let strangeValues = [];

  data.forEach(v => {
    // 빈 값 문제

    if (!v.spotId) {
      strangeValues.push(
        `스팟 아이디 ${v.name}의 '상세스팟 아이디'가 존재하지 않습니다 `,
      );
    }

    if (!v.spotName) {
      strangeValues.push(
        `스팟 아이디 ${v.email}의 '상세스팟 이름'이 존재하지 않습니다 `,
      );
    }
    if (!v.groupId) {
      strangeValues.push(
        `스팟 아이디 ${v.phone}의 '그룹 아이디'가 존재하지 않습니다 `,
      );
    }
    if (!v.groupName) {
      strangeValues.push(
        `스팟 아이디 ${v.spotId}의 '그룹 이름'이 존재하지 않습니다 `,
      );
    }

    // 타입 문제

    if (typeof v.spotId !== 'number') {
      strangeValues.push(
        `스팟 아이디 ${v.spotId}의 상세스팟 아이디값이 숫자가 아닙니다 `,
      );
    }
    if (typeof v.spotName !== 'string') {
      strangeValues.push(
        `스팟 아이디 ${v.spotId}의 상세스팟 이름값이 문자열이 아닙니다 `,
      );
    }
    if (typeof v.groupId !== 'number') {
      strangeValues.push(
        `스팟 아이디 ${v.spotId}의 그룹스팟값이 문자열이 아닙니다 `,
      );
    }
    if (typeof v.groupName !== 'string') {
      strangeValues.push(
        `스팟 아이디 ${v.spotId}의 그룹이름값이 문자열이 아닙니다 `,
      );
    }

    // 올바른 값 문제
  });

  // diningType 이 적어도 하나가 정해지면 아래 4개는 선택되어야됨
  if (strangeValues.length > 0) {
    console.log(`${strangeValues.toString()}`);
  } else {
    console.log('빈 값은 없는 상태입니다 ');
  }
};
