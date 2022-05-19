import { FC, useContext } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { BOOKING_SCHEDULES, SchedulesT } from '@utils/constants';
import { ExceptionsContext } from '@src/context/Exceptions';
type eButtonT = ButtonProps & {
  id: SchedulesT;
};

const ExceptionButton: FC<eButtonT> = ({ id }) => {
  const { schedule, setNewSchedule } = useContext(ExceptionsContext);
  const { id: schedId } = schedule;
  const { title } = BOOKING_SCHEDULES[id];
  return (
    <Button
      bg={schedId === id ? 'brand.medium' : 'brand.light'}
      _hover={{ bg: 'brand.dark' }}
      color="white"
      id={id}
      onClick={() => setNewSchedule(id)}
    >
      {title}
    </Button>
  );
};

export default ExceptionButton;
