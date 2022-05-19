import { FC, useEffect, useState } from 'react';
import OperationTable from './OperationTable';
import Query from '@components/Query';
import { useLazyQuery } from '@apollo/client';
import { ScheduleClient } from '@src/graphql/clients';
import { Box, Button, Text, HStack } from '@chakra-ui/react';
import { GET_SOLD_BLOCKS } from '@src/graphql/Queries/Orders';
import { ORDER_REPORT_TYPE } from '@utils/constants';
import { isNil } from 'ramda';
import { Datepicker } from '@components/NewDatepicker';
import { isAfter, addDays } from 'date-fns';

type TimeBlock = {
  date: string;
  sold: number;
};
type MappedBlock = {
  date: string;
  hour: string;
  sold: number;
};

type ScheduleT = {
  isLab: boolean;
  isCovid: boolean;
  owner: string;
  title: string;
};

const OperationReport: FC = () => {
  const [schedule, setSchedule] = useState<ScheduleT>({
    isLab: false,
    isCovid: true,
    owner: 'Metropolitana',
    title: 'Domicilio COVID',
  });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 7));
  const [getBlocks, { loading, error, data }] = useLazyQuery(GET_SOLD_BLOCKS, {
    client: ScheduleClient,
    fetchPolicy: 'network-only',
    onCompleted: ({ getSoldBlocks }) => {
      return getSoldBlocks;
    },
  });
  const newBlocks: MappedBlock[] = data?.getSoldBlocks?.map(({ date, sold }: TimeBlock) => ({
    date: date.split('T')[0],
    hour: date.split('T')[1],
    sold: sold,
  }));
  const selectStartDate = (date: Date) => {
    if (!isNil(date)) {
      return setStartDate(date);
    }
  };
  const selectEndDate = (date: Date) => {
    if (!isNil(date)) {
      return setEndDate(date);
    }
  };
  useEffect(() => {
    if (isAfter(startDate, endDate)) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    const { isLab, isCovid, owner } = schedule;
    getBlocks({
      variables: {
        input: {
          startDate: new Date(startDate).toLocaleString('en-EN', { timeZone: 'America/Santiago' }),
          endDate: new Date(endDate).toLocaleString('en-EN', { timeZone: 'America/Santiago' }),
          isLab,
          isCovid,
          owner,
        },
      },
    });
  }, [startDate, endDate, schedule, getBlocks]);

  return (
    <Box p={4}>
      <Box my={8} w="full" justifyContent="center" display="flex">
        <HStack alignItems="flex-start">
          <Box>
            <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
              Desde
            </Text>
            <Datepicker selectedDate={startDate} handleSelection={selectStartDate} />
          </Box>
          <Box>
            <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
              Hasta
            </Text>
            <Datepicker selectedDate={endDate} handleSelection={selectEndDate} />
          </Box>
        </HStack>
      </Box>
      <HStack justifyContent="center" alignItems="center" mb="2rem">
        {Object.values(ORDER_REPORT_TYPE).map(({ id, title, isLab, isCovid, owner }) => {
          return (
            <Button
              key={id}
              bg={title === schedule.title ? 'brand.dark' : 'brand.medium'}
              color="white"
              _hover={{
                bg: 'brand.dark',
              }}
              onClick={() => {
                setSchedule({ title, isLab, isCovid, owner });
              }}
            >
              {title}
            </Button>
          );
        })}
      </HStack>
      <Query loading={loading} error={error} data={data}>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize="1.2rem">
            {schedule.title}
          </Text>
          {newBlocks?.length > 0 ? (
            <OperationTable mappedBlocks={newBlocks} />
          ) : (
            'No hay datos para mostrar'
          )}
        </Box>
      </Query>
    </Box>
  );
};
export default OperationReport;
