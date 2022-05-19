import { FC, useMemo, useState, useEffect, useRef } from 'react';
import { CUSTOMER_SERVICE_TABLE_COLUMNS, OPERATION_TABLE_COLUMNS } from '@utils/constants';
import { format } from 'date-fns';
import { Box, Input, Text } from '@chakra-ui/react';
import { RootState } from '@src/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { pick } from 'ramda';
import { MultiGrid } from 'react-virtualized';
import { editOrder } from '@redux/modal';

const currentTable = {
  customer_service: CUSTOMER_SERVICE_TABLE_COLUMNS,
  operation: OPERATION_TABLE_COLUMNS,
};

type TableT = {
  height: number;
  width: number;
  editable?: boolean;
};

const NewTable: FC<TableT> = ({ height, width, editable }) => {
  const { originalOrders, table } = useSelector((state: RootState) => state.orders);
  const [users, setUsers] = useState<LooseObject[]>([]);
  const [filters, setFilters] = useState<LooseObject>({});
  const [results, setResults] = useState([]);
  const [lastInput, setLastInput] = useState('');
  const tableHeaders: LooseObject = currentTable[table];
  const tHeaderConfigs: LooseObject = Object.values(tableHeaders);
  const currentKeys = Object.keys(tableHeaders);
  const renderFilters = currentKeys;
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useMemo(() => {
    const r = users.reduce((acc: any, user: LooseObject) => {
      const is_result = Object.keys(filters)
        .filter((k) => !!k.trim())
        .every((fkey) => {
          return user[fkey].toLowerCase().includes(filters[fkey].toLowerCase());
        });
      if (is_result) {
        return [...acc, user];
      }
      return acc;
    }, []);
    setResults(r);
  }, [filters, users]);

  useEffect(() => setUsers(originalOrders), [originalOrders]);

  const renderRows = [{}, ...results?.map((user: LooseObject) => pick(currentKeys, user))];

  useEffect(() => {
    if (inputRef.current) {
      //@ts-ignore
      inputRef.current.focus();
    }
  });

  return (
    <>
      <MultiGrid
        filters={filters}
        data={renderRows}
        className="virtualized-grid"
        columnCount={currentKeys.length}
        columnWidth={({ index }: LooseObject) => {
          const colW = tHeaderConfigs[index].style?.width;
          return colW ? colW : 132;
        }}
        height={height}
        overscanColumnCount={0}
        overscanRowCount={50}
        cellRenderer={({ columnIndex, key, parent, rowIndex, style }: LooseObject) => {
          const originalDataSource: LooseObject = results[rowIndex - 1];
          const renderDataSource = renderRows[rowIndex];
          const cellKey = renderFilters[columnIndex];
          const cellData = renderDataSource[cellKey];
          if (rowIndex === 0) {
            return (
              <Box id={cellKey} style={{ ...style }} px={4} height="64px">
                <Text>{tableHeaders[cellKey].label} </Text>
                <Input
                  ref={lastInput === cellKey ? inputRef : null}
                  value={filters[cellKey] || ''}
                  h="30px"
                  p="4px"
                  onChange={(e) => {
                    if (lastInput !== cellKey) {
                      setLastInput(cellKey);
                    }
                    setFilters({ ...filters, [e.target.name]: e.target.value });
                  }}
                  name={cellKey}
                  type="text"
                />
              </Box>
            );
          }
          return (
            <Box
              onClick={() => {
                if (editable) {
                  dispatch(
                    editOrder({
                      ...originalDataSource,
                      examId: originalDataSource.id,
                      addressDetail: originalDataSource.addressDetail,
                      date: format(
                        new Date(originalDataSource.date.split('-').reverse()),
                        'yyyy-MM-dd'
                      ),
                    })
                  );
                }
              }}
              className={cellKey}
              px={4}
              fontSize="14px"
              style={{
                ...style,
              }}
            >
              {cellData}
            </Box>
          );
        }}
        rowCount={renderRows.length}
        rowHeight={({ index }: LooseObject) => {
          return index === 0 ? 64 : 35;
        }}
        width={width}
        fixedColumnCount={0}
        fixedRowCount={renderRows.length > 1 ? 1 : 0}
      />
    </>
  );
};

export default NewTable;
