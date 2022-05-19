import { FC, useContext, useEffect } from 'react';
import Select, { components, GroupHeadingProps } from 'react-select';
import { Box, Button } from '@chakra-ui/react';
import { ExceptionsContext } from '@src/context/Exceptions';
import { ScheduleClient } from '@src/graphql/clients';
import { GET_STATES } from '@src/graphql/Queries/Exceptions';
import { useQuery } from '@apollo/client';
import Query from '@components/Query';

interface StateN {
  stateName: string;
}

interface Province {
  province: string;
  states: StateN[];
}

export interface StateOption {
  readonly value: string;
  readonly label: string;
}

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly StateOption[];
}

const GroupHeading = (props: GroupHeadingProps<StateOption>) => {
  return (
    <Box bg="brand.medium" py={2} px={3}>
      <components.GroupHeading {...props} />
    </Box>
  );
};

const ExeptionRegions: FC = () => {
  const { schedule, scheduleHandler } = useContext(ExceptionsContext);
  const { data, loading, error } = useQuery(GET_STATES, { client: ScheduleClient });
  const options = data?.getAllStates?.map(
    ({ province, states }: Province): GroupedOption => ({
      label: province,
      options: states.map(({ stateName }): StateOption => ({ label: stateName, value: stateName })),
    })
  );
  return (
    <Box w="full" mt={8}>
      <Query loading={loading} error={error}>
        <Select<StateOption>
          options={options}
          components={{ GroupHeading }}
          //@ts-ignore
          isMulti
          styles={{
            groupHeading: (base) => ({
              ...base,
              flex: '1 1',
              color: 'white',
              margin: 0,
              paddingLeft: 0,
              paddingRight: 0,
              fontFamily: 'Rubik',
              textTransform: 'none',
              fontSize: '1rem',
            }),
          }}
          value={schedule.stateNames}
          onChange={(e) => {
            if (Array.isArray(e)) {
              scheduleHandler({ stateNames: e.map((state) => state) });
            }
          }}
          placeholder="Selecciona las comunas"
        />
        <Box display="flex" justifyContent="space-between" mt={4} w="full">
          {options?.map(({ label, options: states }: GroupedOption) => (
            <Button
              key={label}
              colorScheme="mainColor"
              onClick={() => {
                scheduleHandler({ stateNames: states.map((state) => state) });
              }}
            >
              Seleccionar {label}
            </Button>
          ))}
        </Box>
      </Query>
    </Box>
  );
};

export default ExeptionRegions;
