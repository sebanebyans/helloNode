import { useState, useMemo, FC } from 'react';
import { Button, HStack, MenuButton, Menu, Text, Portal, MenuList } from '@chakra-ui/react';
import { isNil, equals } from 'ramda';
import { useDayzed } from 'dayzed';
import { FilterT } from 'react-table';
import DatePicker from '@components/DatePicker';

const DateRangeFilter: FC<FilterT> = ({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0);
    let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]) : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);
  const [val1, setVal1] = useState<Date>(filterValue[0]);
  const [val2, setVal2] = useState<Date>(filterValue[1]);

  const handleFilters = () => {
    const eqState = equals(filterValue, [val1, val2]);
    if (!eqState) {
      if (val1 || val2) {
        setFilter((old = []) => [val1, old[1]]);
        return setFilter((old = []) => [old[0], val2]);
      }
    }
  };

  const selectStartDate = (options: { selectable: boolean; date: Date }) => {
    const { selectable, date } = options;
    if (!selectable) {
      return;
    }
    if (!isNil(date)) {
      setVal1(date);
      return;
    }
  };
  const selectEndDate = (options: { selectable: boolean; date: Date }) => {
    const { selectable, date } = options;
    if (!selectable) {
      return;
    }
    if (!isNil(date)) {
      setVal2(date);
      return;
    }
  };
  const startDate = useDayzed({
    showOutsideDays: true,
    onDateSelected: selectStartDate,
    selected: val1 || min,
    date: val1 || min,
  });
  const endDate = useDayzed({
    showOutsideDays: true,
    onDateSelected: selectEndDate,
    selected: val2 || max,
    date: val2 || max,
  });
  return (
    <Menu closeOnSelect={false} onClose={() => handleFilters()}>
      {({ isOpen }) => (
        <>
          <MenuButton> {isOpen ? 'Cerrar' : 'Abrir'} filtro</MenuButton>
          <Portal>
            <MenuList>
              <HStack alignItems="flex-start" p="2">
                <DatePicker {...startDate} />
                <DatePicker {...endDate} />
              </HStack>
              <Text align="center">
                {filterValue[0] &&
                  `Mostrando desde el
                  ${new Date(filterValue[0]).toLocaleDateString('es-CL').replace(/-/g, '/')}`}
                {filterValue[0] &&
                  filterValue[1] &&
                  ` hasta el
                  ${new Date(filterValue[1]).toLocaleDateString('es-CL').replace(/-/g, '/')}`}
              </Text>
              <Button
                display="flex"
                justifySelf="flex-end"
                ml="auto"
                mr="4"
                onClick={() => {
                  selectStartDate({ selectable: true, date: min });
                  selectEndDate({ selectable: true, date: max });
                }}
              >
                Reiniciar
              </Button>
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};

export default DateRangeFilter;
