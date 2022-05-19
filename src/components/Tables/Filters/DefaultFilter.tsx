import { FC } from 'react';
import { Input, Menu, MenuList, Portal, MenuButton } from '@chakra-ui/react';
import { useAsyncDebounce } from 'react-table';
import { FilterT } from 'react-table';

const DefaultFilter: FC<FilterT> = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  const count = preFilteredRows.length;
  return (
    <Menu closeOnSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton> {isOpen ? 'Cerrar' : 'Abrir'} filtro</MenuButton>
          <Portal>
            <MenuList>
              <Input
                variant="filled"
                minW="100px"
                value={filterValue || ''}
                onChange={(e) => {
                  setFilter(e.target.value || undefined);
                }}
                placeholder={`${count} resultados`}
              />
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};

export default DefaultFilter;
