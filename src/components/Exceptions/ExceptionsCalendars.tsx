/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useContext, useEffect } from 'react';
import DatePicker from '@components/DatePicker';
import { HStack, Box, Text, Input } from '@chakra-ui/react';
import { useDayzed } from 'dayzed';
import { isNil } from 'ramda';
import { endOfYesterday, set, getHours, getMinutes, isAfter, isBefore } from 'date-fns';
import { ExceptionsContext } from '@src/context/Exceptions';

const ExceptionsCalendars: FC = () => {
  const { schedule, scheduleHandler } = useContext(ExceptionsContext);
  const { from, until } = schedule;
  const [val1, setVal1] = useState<Date>(new Date(schedule.from));
  const [val2, setVal2] = useState<Date>(new Date(schedule.until));

  const selectStartDate = (options: { selectable: boolean; date: Date }) => {
    const { selectable, date } = options;
    if (!isNil(date) && selectable) {
      scheduleHandler({ from: set(date, { hours: getHours(from), minutes: getMinutes(from) }) });
      return setVal1(date);
    }
  };

  const selectEndDate = (options: { selectable: boolean; date: Date }) => {
    const { selectable, date } = options;
    if (!isNil(date) && selectable) {
      scheduleHandler({ until: set(date, { hours: getHours(until), minutes: getMinutes(until) }) });
      return setVal2(date);
    }
  };
  const startDate = useDayzed({
    showOutsideDays: true,
    onDateSelected: selectStartDate,
    selected: val1,
    date: val1,
    minDate: endOfYesterday(),
  });
  const endDate = useDayzed({
    showOutsideDays: true,
    onDateSelected: selectEndDate,
    selected: val2,
    date: val2,
    minDate: endOfYesterday(),
  });
  useEffect(() => {
    if (isAfter(val1, val2)) {
      scheduleHandler({
        until: set(val1, { hours: getHours(until), minutes: getMinutes(until) }),
      });
      setVal2(val1);
    }
  }, [val1, val2]);
  return (
    <Box mt={8} w="full" justifyContent="center" display="flex">
      <HStack alignItems="flex-start" p="2" spacing={8}>
        <Box>
          <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
            Desde
          </Text>
          <DatePicker {...startDate} />
        </Box>
        <Box>
          <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
            Hasta
          </Text>
          <DatePicker {...endDate} />
        </Box>
      </HStack>
    </Box>
  );
};

export default ExceptionsCalendars;
