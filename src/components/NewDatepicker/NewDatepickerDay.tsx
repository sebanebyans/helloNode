import { FC } from 'react';
import { Button } from '@chakra-ui/react';

type DayT = {
  day: number;
  date: Date | undefined;
  selected: boolean;
  disabled: boolean;
};
const DayButton: FC<DayT> = ({ disabled, date, selected }) => {
  return (
    <Button
      size="xs"
      w="25px"
      h="25px"
      disabled={disabled}
      color={selected ? 'white' : 'black'}
      _hover={{
        color: 'white',
        bg: 'brand.medium',
        cursor: 'pointer',
      }}
      bg={selected ? 'brand.medium' : 'gray.100'}
    >
      {date ? date.getDate() : ''}
    </Button>
  );
};

export default DayButton;
