import Papa from 'papaparse';
import XLSX from 'xlsx';
import { XLSX_HEADER } from '@utils/constants';
import { ordersToTableMapper } from '@src/utils/mapper';

type ExportDataT = {
  columns: object[];
  data: object[];
  fileType: string;
  fileName: string;
};

export const getExportFileBlob = ({ columns, data, fileType, fileName }: ExportDataT) => {
  if (fileType === 'csv') {
    const headerNames = columns.map((col: any) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: 'text/csv' });
  } else if (fileType === 'xlsx') {
    const header = columns.map((c: any) => c.exportValue);
    const compatibleData = data.map((row: LooseObject) => {
      const obj: LooseObject = {};
      header.forEach((col: string, index: number) => {
        obj[col] = row[index];
      });
      return obj;
    });
    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    return false;
  }
  return false;
};

export const exportGraphqlData = (data: any, name: string) => {
  const headers: LooseObject = XLSX_HEADER[name];
  let compatibleData = [];
  if (data.nodes) {
    const mapData = ordersToTableMapper(data?.nodes);
    compatibleData = mapData.map((row: LooseObject) => {
      const obj: LooseObject = {};
      headers.forEach((col: any, index: number) => {
        obj[col.tittle] = row[col.key];
      });
      return obj;
    });
  }
  if (!data.nodes) {
    compatibleData = data.map((row: LooseObject) => {
      const obj: LooseObject = {};
      headers.forEach((col: any, index: number) => {
        obj[col.tittle] = row[name === 'softland' ? col.tittle : col.key];
      });
      return obj;
    });
  }
  const header = headers.map((item: any) => item.tittle);
  let wb = XLSX.utils.book_new();
  let ws1 = XLSX.utils.json_to_sheet(compatibleData, { header });
  // let ws1 = XLSX.utils.json_to_sheet(getSimpliRouteReport);

  XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
  XLSX.writeFile(wb, `${name}.xlsx`);
  return false;
};
