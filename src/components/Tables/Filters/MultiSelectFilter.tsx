import { FC, useMemo, useState } from 'react';
import {
  Menu,
  MenuOptionGroup,
  MenuList,
  MenuItemOption,
  MenuButton,
  Portal,
} from '@chakra-ui/react';
import { FilterT } from 'react-table';

const MultiSelectFilter: FC<FilterT> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    //@ts-ignore
    return [...options.values()];
  }, [id, preFilteredRows]);
  const [menuState, setMenuState] = useState<string | string[]>(filterValue);
  const handleSelection = () => {
    if (menuState?.length) {
      return setFilter(menuState);
    }
    return setFilter(undefined);
  };
  return (
    <Menu closeOnSelect={false} onClose={() => handleSelection()}>
      {({ isOpen }) => (
        <>
          <MenuButton> {isOpen ? 'Cerrar' : 'Abrir'} filtro</MenuButton>
          <Portal>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                type="checkbox"
                value={menuState}
                onChange={(value) => setMenuState(value)}
              >
                {options.map((option, i) => (
                  <MenuItemOption key={i} value={option}>
                    {option}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};

export default MultiSelectFilter;
