import { FC, useState, useMemo } from 'react';
import { Input, InputGroup, Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react';
import { equals } from 'ramda';
import { FilterT } from 'react-table';

const NumberRangeFilter: FC<FilterT> = ({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);
  const [val1, setVal1] = useState<number | undefined>(filterValue[0]);
  const [val2, setVal2] = useState<number | undefined>(filterValue[1]);
  const valToInt = (val: string) => (val ? parseInt(val, 10) : undefined);
  const handleFilters = () => {
    const eqState = equals(filterValue, [val1, val2]);
    if (!eqState) {
      if (filterValue.length && !val1 && !val2) {
        return setFilter([undefined, undefined]);
      }
      if (val1 || val2) {
        setFilter((old = []) => [val1, old[1]]);
        return setFilter((old = []) => [old[0], val2]);
      }
    }
  };
  return (
    <Menu closeOnSelect={false} onClose={() => handleFilters()}>
      {({ isOpen }) => (
        <>
          <MenuButton> {isOpen ? 'Cerrar' : 'Abrir'} filtro</MenuButton>
          <Portal>
            <MenuList>
              <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
                <Input
                  variant="filled"
                  value={val1 || ''}
                  onChange={(e) => {
                    setVal1(valToInt(e.target.value));
                  }}
                  placeholder={`Min (${min})`}
                />
                <Input
                  variant="filled"
                  value={val2 || ''}
                  onChange={(e) => {
                    setVal2(valToInt(e.target.value));
                  }}
                  placeholder={`Max (${max})`}
                />
              </InputGroup>
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};

export default NumberRangeFilter;
