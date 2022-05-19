import { FC } from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Heading,
  TableProps,
} from '@chakra-ui/react';

type TableT = TableProps & {
  data: any[];
  columns: any[];
  title: string;
};

const Table: FC<TableT> = ({ data, columns, title, ...rest }) => (
  <Box bg={useColorModeValue('white', 'gray.800')} {...rest}>
    <Heading size="md" p="4">
      {title}
    </Heading>
    <ChakraTable variant="simple" size="sm">
      <Thead>
        <Tr>
          {columns.map(({ Header, accessor }) => (
            <Th key={accessor}>{Header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map(({ date, fullName, product, paymentType, comune }) => (
          <Tr key={`${fullName}${date}`}>
            <Td>{date}</Td>
            <Td>{fullName}</Td>
            <Td>{product}</Td>
            <Td>{comune}</Td>
            <Td>{paymentType}</Td>
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  </Box>
);

export default Table;
