import { FC, useMemo } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Flex, TableProps, Box } from '@chakra-ui/react';
// @ts-ignore
import { useExportData } from 'react-table-plugins';
import { useTable, useGlobalFilter, usePagination, Cell, Row } from 'react-table';
import { GlobalFilter } from './Filters';
import { getExportFileBlob } from '@src/utils/exportData';
import { useDispatch } from 'react-redux';
import { editOrder } from '@redux/modal';
import { format } from 'date-fns';

type TableT = TableProps & {
  data: any[];
  columns: any[];
  title: string;
  fetchNext: () => void;
  fetchPrev: () => void;
};

const OrdersTable: FC<TableT> = ({ data, title, columns, fetchNext, fetchPrev, ...rest }) => {
  const dispatch = useDispatch();
  const startEditOrder = ({
    //@ts-ignore
    original: { id, date, addressDetail },
    values: {
      rut,
      name,
      lastName,
      secondLastName,
      birthdate,
      email,
      phone,
      address,
      addressNumber,
      stateName,
      province,
      start,
      end,
      orderNumber,
      passport,
      orderState,
      title,
    },
  }: Row) =>
    dispatch(
      editOrder({
        rut,
        passport,
        name,
        lastName,
        secondLastName,
        birthdate,
        email,
        phone,
        address,
        addressNumber,
        addressDetail,
        stateName,
        province,
        start,
        end,
        examId: id,
        orderNumber,
        orderState,
        date: date.split('T')[0],
        title,
      })
    );

  const defaultColumn = useMemo(() => ({}), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      defaultColumn,
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: data?.length * 3 || 500 },
      getExportFileBlob,
    },
    useGlobalFilter,
    usePagination,
    useExportData
  );

  return (
    <Box p="1rem">
      <Flex maxW="100%" overflow="auto" alignItems="stretch" height="calc(100vh - 187px)">
        <Table
          size="sm"
          bg="white"
          {...getTableProps()}
          {...rest}
          borderRadius="0"
          height="fit-content"
          boxShadow="none"
        >
          <Thead>
            {headerGroups.map((headerGroup: any) => {
              const groupProps = headerGroup.getHeaderGroupProps();
              return (
                <Tr {...groupProps} key={groupProps.key}>
                  {headerGroup.headers.map((column: any) => (
                    <Th
                      minW="90px"
                      whiteSpace="nowrap"
                      pos="sticky"
                      bg="white"
                      top="0"
                      p="2"
                      key={column.id}
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </Th>
                  ))}
                </Tr>
              );
            })}
            <Tr>
              <Th pos="sticky" top="30px" bg="white" colSpan={visibleColumns.length}>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: Row, i) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  key={`${row.id}${row.values.orderNumber}${row.values.name}${row.values.code}`}
                  _hover={{ backgroundColor: 'brand.light', cursor: 'pointer' }}
                  onClick={() => {
                    startEditOrder(row);
                  }}
                >
                  <Td> {row.values.orderNumber} </Td>
                  <Td> {row.values.orderState} </Td>
                  <Td> {row.values['payment.paymentDate']} </Td>
                  <Td> {row.values['payment.amount']} </Td>
                  <Td> {row.values.total} </Td>
                  <Td> {row.values.paymentMethod} </Td>
                  <Td> {row.values.testReason} </Td>
                  <Td> {format(new Date(row.values.dateField), 'dd/MM/yyyy')} </Td>
                  <Td> {row.values.start} </Td>
                  <Td> {row.values.end} </Td>
                  <Td> {row.values.rut} </Td>
                  <Td> {row.values.passport} </Td>
                  <Td> {row.values.name} </Td>
                  <Td> {row.values.lastName} </Td>
                  <Td> {row.values.secondLastName} </Td>
                  <Td> {row.values.phone} </Td>
                  <Td> {row.values.email} </Td>
                  <Td> {row.values.gender} </Td>
                  <Td> {row.values.birthdate} </Td>
                  <Td> {row.values.province} </Td>
                  <Td> {row.values.stateName} </Td>
                  <Td> {row.values.address} </Td>
                  <Td> {row.values.addressNumber} </Td>
                  <Td> {row.values.title} </Td>
                  <Td> {row.values.category} </Td>
                  <Td> {row.values.code} </Td>
                  <Td> {row.values.isCovidField} </Td>
                  <Td> {row.values.isFastField} </Td>
                  <Td> {row.values.isLabField} </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Box>
  );
};
export default OrdersTable;
