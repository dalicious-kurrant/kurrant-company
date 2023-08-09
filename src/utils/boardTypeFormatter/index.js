export function boardTypeFormatted(data) {
  switch (data) {
    case 0:
      return '공지';
    case 3:
      return '이벤트';
    case 5:
      return '개별 공지';
    case 6:
      return '변경승인';
    case 7:
      return '변경승인';
    case 8:
      return '정산';
    default:
      return '공지';
  }
}
