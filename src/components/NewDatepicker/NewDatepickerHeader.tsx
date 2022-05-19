import { FC } from 'react';
import { range } from 'ramda';
import { getYear, getMonth } from 'date-fns';
import { Button, Box, Select } from '@chakra-ui/react';

const years = range(getYear(new Date()), getYear(new Date()) + 2);
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Augosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

type HeaderT = {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
};

const DatepickerHeader: FC<HeaderT> = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  return (
    <Box display="flex" justifyContent="space-around" bg="brand.medium" w="350px">
      <Button size="sm" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} mr={4}>
        {'<'}
      </Button>
      <Select
        size="sm"
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(Number(value))}
        mr={4}
        bg="white"
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Select
        size="sm"
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
        mr={4}
        bg="white"
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Button size="sm" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {'>'}
      </Button>
    </Box>
  );
};
export default DatepickerHeader;
