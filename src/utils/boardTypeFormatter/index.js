export function boardTypeFormatted(data) {
  switch (data) {
    case 0:
      return '전체 공지';
    case 3:
      return '이벤트';
    case 5:
      return '개별 공지';
    case 6:
      return '정보 변경';
    case 7:
      return '가격 변경';
    case 8:
      return '정산';
    default:
      return '전체 공지';
  }
}
