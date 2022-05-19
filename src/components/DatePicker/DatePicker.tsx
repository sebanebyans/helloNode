import { FC } from 'react';
import { Box, Button, Divider, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { isEmpty } from 'ramda';
import { DateObj, RenderProps } from 'dayzed';
import { DAY_NAMES, MONTH_NAMES } from '@src/utils/constants';
import DatePickerButtons from './DatePickerButtons';

const DatePicker: FC<RenderProps> = ({
  calendars,
  getDateProps,
  getBackProps,
  getForwardProps,
}) => {
  if (isEmpty(calendars)) {
    return null;
  }
  return (
    <Box>
      <HStack spacing={6} alignItems="baseline">
        {calendars.map((calendar) => {
          return (
            <VStack key={`${calendar.month}${calendar.year}`}>
              <HStack>
                <DatePickerButtons calendars={calendars} getProps={getBackProps} backButton />
                <Heading size="xs">
                  {MONTH_NAMES[calendar.month]} {calendar.year}
                </Heading>
                <DatePickerButtons calendars={calendars} getProps={getForwardProps} />
              </HStack>
              <Divider />
              <SimpleGrid columns={7} spacing={1} textAlign="center">
                {DAY_NAMES.map((day) => (
                  <Box key={`${calendar.month}${calendar.year}${day}`}>
                    <Text fontSize="xs" fontWeight="semibold">
                      {day}
                    </Text>
                  </Box>
                ))}
                {calendar.weeks.map((week, weekIndex) => {
                  //@ts-ignore
                  return week.map((dateObj: DateObj, index) => {
                    const { date, prevMonth, nextMonth, selected } = dateObj;
                    const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                    const isDisabled = prevMonth || nextMonth;
                    const style = () => {
                      const obj: LooseObject = {
                        variant: 'outline',
                        borderColor: 'transparent',
                      };
                      if (selected) {
                        obj.bg = 'brand.medium';
                        obj.color = 'white';
                      }
                      return obj;
                    };
                    return (
                      <Button
                        {...getDateProps({
                          dateObj,
                          disabled: isDisabled,
                        })}
                        key={key}
                        size="xs"
                        {...style()}
                      >
                        {date.getDate()}
                      </Button>
                    );
                  });
                })}
              </SimpleGrid>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
};

export default DatePicker;
