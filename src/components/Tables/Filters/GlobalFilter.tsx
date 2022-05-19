import { FC, useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useAsyncDebounce, GlobalFilterT } from 'react-table';
import { FiSearch } from 'react-icons/fi';

const GlobalFilter: FC<GlobalFilterT> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup w="96" display="flex">
      <InputLeftElement color="gray.500">
        <FiSearch />
      </InputLeftElement>
      <Input
        variant="filled"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Buscar en ${count} resultados.`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </InputGroup>
  );
};

export default GlobalFilter;
