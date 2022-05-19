import { CloseButton, Input, Stack } from '@chakra-ui/react';
import React from 'react';

const FilterExam = ({ filterText, onFilter, onClear }: any) => (
  <>
    <Stack direction="row" spacing={3}>
      <Input
        id="search"
        type="text"
        placeholder="Buscar un examen..."
        value={filterText}
        onChange={onFilter}
      />
      <CloseButton size="lg" colorScheme="blue" onClick={onClear} />
    </Stack>
  </>
);

export default FilterExam;
