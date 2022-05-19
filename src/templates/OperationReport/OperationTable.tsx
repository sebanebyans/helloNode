/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from 'react';
import { Flex, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { uniq, sort } from 'ramda';

type MappedBlock = {
  date: string;
  hour: string;
  sold: number;
};

type OperationTableT = {
  mappedBlocks: MappedBlock[];
};

const OperationTable: FC<OperationTableT> = ({ mappedBlocks }) => {
  const orderHourAsc = function (a: string, b: string) {
    return parseInt(a.replace(/:/g, ''), 10) - parseInt(b.replace(/:/g, ''), 10);
  };
  const OrderDateAsc = function (a: string, b: string) {
    //@ts-ignore
    return new Date(a) - new Date(b);
  };
  const blocks = sort(orderHourAsc, uniq(mappedBlocks?.map(({ hour }) => hour)));
  const headers = ['Fecha', ...blocks, 'Total'];
  const rows = sort(OrderDateAsc, uniq(mappedBlocks?.map(({ date }) => date)));
  const createReport = () => {
    const report = [];
    for (let indexR = 0; indexR < rows.length; indexR++) {
      const hourReport = new Array(blocks.length);
      hourReport[0] = rows[indexR];
      let acumulado = 0;
      for (let indexH = 0; indexH < blocks.length; indexH++) {
        const valor =
          mappedBlocks.filter(
            ({ date, hour }) => date === rows[indexR] && hour === blocks[indexH]
          )[0]?.sold || 0;
        acumulado += valor;
        hourReport[indexH + 1] = valor;
      }
      hourReport[blocks.length + 1] = acumulado;
      report.push(hourReport);
    }
    return report;
  };
  const reports = createReport();

  return (
    <Flex mt={4} w="full" overflowX="auto">
      <Table w="full" size="sm" variant="simple" bg="white">
        <Thead>
          <Tr>
            {headers.map((hdr: string, index: number) => (
              <Th textAlign="center" key={hdr} p={4}>
                {hdr.split(':00.000Z')[0]}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {reports?.map((report: LooseObject) => {
            return (
              <Tr key={report[0]}>
                {report.map((value: any, index: number) => {
                  return (
                    <Fragment key={`${report[0]}${index}${value}`}>
                      <Td fontSize="xs" fontWeight="hairline" textAlign="center">
                        {index === 0 ? value.split('-').reverse().join('/') : value}
                      </Td>
                    </Fragment>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default OperationTable;
