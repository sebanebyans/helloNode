/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from 'react';
import { HStack, Box, Text } from '@chakra-ui/react';
import { isNil } from 'ramda';
import { Datepicker } from '@components/NewDatepicker';
import { isAfter } from 'date-fns';

type DateRangeT = {
  range: {
    from: Date;
    until: Date;
  };
  handleRange: (param: any) => void;
};

const ExportSheetDates: FC<DateRangeT> = ({ range, handleRange }) => {
  const [val1, setVal1] = useState<Date>(new Date(range.from));
  const [val2, setVal2] = useState<Date>(new Date(range.until));
  const selectStartDate = (date: Date) => {
    if (!isNil(date)) {
      handleRange({ from: date });
      return setVal1(date);
    }
  };
  const selectEndDate = (date: Date) => {
    if (!isNil(date)) {
      handleRange({ until: date });
      return setVal2(date);
    }
  };
  useEffect(() => {
    if (isAfter(val1, val2)) {
      handleRange({
        until: val1,
      });
      setVal2(val1);
    }
  }, [val1, val2]);

  return (
    <Box my={8} w="full" justifyContent="center" display="flex">
      <HStack alignItems="flex-start">
        <Box>
          <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
            Desde
          </Text>
          <Datepicker selectedDate={val1} handleSelection={selectStartDate} />
        </Box>
        <Box>
          <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
            Hasta
          </Text>
          <Datepicker selectedDate={val2} handleSelection={selectEndDate} />
        </Box>
      </HStack>
    </Box>
  );
};

export default ExportSheetDates;
