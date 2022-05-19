import { FC } from 'react';
import { Box, ButtonGroup, Button } from '@chakra-ui/react';
import {
  ExceptionButton,
  Calendars,
  Duration,
  Regions,
  Confirmation,
} from '@components/Exceptions';
import { BOOKING_SCHEDULES } from '@utils/constants';
import ExceptionsProvider from '@src/context/Exceptions';

const Exceptions: FC = () => {
  return (
    <ExceptionsProvider>
      <Box
        display="flex"
        justifyContent="center"
        p={8}
        flexWrap="wrap"
        maxWidth="80%"
        margin="0 auto"
      >
        <ButtonGroup variant="outline" justifyContent="space-between" w="full">
          {Object.values(BOOKING_SCHEDULES).map(({ id }) => {
            return <ExceptionButton id={id} key={id} />;
          })}
        </ButtonGroup>
        <Calendars />
        <Regions />
        <Box display="flex" w="full" justifyContent="space-evenly" alignItems="flex-end">
          <Duration />
          <Confirmation />
        </Box>
      </Box>
    </ExceptionsProvider>
  );
};

export default Exceptions;
