import * as XLSX from 'xlsx';

export function companyExelExport(plan) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(plan, {cellDates: true});
  console.log(plan);
  XLSX.utils.book_append_sheet(workbook, worksheet, '기업 가입 가능 리스트');
  XLSX.writeFile(workbook, '기업_가입_가능_리스트.xlsx');
}
