import { FC, useContext } from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { set } from 'date-fns';
import { ExceptionsContext } from '@src/context/Exceptions';

const labelStyles = {
  m: 0,
  fontWeight: 600,
  display: 'flex',
};
const inputStyle = {
  bg: 'white',
  _focus: {
    border: '2px solid',
    borderColor: 'brand.dark',
  },
  _invalid: {
    borderColor: 'error',
  },
};
const ExceptionDuration: FC = () => {
  const { schedule, handleTime, scheduleHandler } = useContext(ExceptionsContext);
  return (
    <Box display="flex" justifyContent="space-between" width="full" mt={8}>
      <FormControl id="start" mr={4}>
        <FormLabel {...labelStyles}>Hora Inicial</FormLabel>
        <Input
          type="time"
          placeholder="Hora inicial"
          {...inputStyle}
          onChange={(e) => {
            handleTime({ from: e.target.value });
          }}
        />
      </FormControl>
      <FormControl id="end" mr={4}>
        <FormLabel {...labelStyles}>Hora Final</FormLabel>
        <Input
          type="time"
          placeholder="Hora inicial"
          {...inputStyle}
          onChange={(e) => handleTime({ until: e.target.value })}
        />
      </FormControl>
      <FormControl id="start">
        <FormLabel {...labelStyles}>Cupos</FormLabel>
        <NumberInput
          defaultValue={0}
          max={150}
          keepWithinRange={true}
          onChange={(e) => scheduleHandler({ limit: parseInt(e, 10) })}
        >
          <NumberInputField {...inputStyle} w="5rem" />
        </NumberInput>
      </FormControl>
    </Box>
  );
};
export default ExceptionDuration;
