import { FC, useState } from 'react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { groupBy, mapObjIndexed } from 'ramda';

export type ScheduleStatesT = {
  isCovid: boolean;
  isCore: boolean;
  stateName: string;
  province: string;
};

type ProvincesT = {
  province: string;
  states: ScheduleStatesT[];
};
type ProvincesArr = {
  values: LooseObject | null;
  handler: (param: LooseObject) => void;
  provinces: ProvincesT[];
};

const formControlProps = {
  w: { base: 'full', lg: '45%' },
  alignItems: { lg: 'flex-start' },
  justifyContent: { lg: 'flex-start' },
  display: { lg: 'flex' },
  _even: {
    ml: { lg: 4 },
  },
  _odd: {
    mr: { lg: 4 },
  },
};

const SelectProvince: FC<ProvincesArr> = ({ provinces, values, handler }) => {
  const mappedProvinces = Object.fromEntries(
    provinces.map(({ province, states }: ProvincesT) => [province, states])
  );
  const provNames = Object.keys(mappedProvinces).map((province) => province);
  const [states, setStates] = useState<ScheduleStatesT[]>(mappedProvinces[values?.province]);
  return (
    <>
      {states?.length >= 1 && (
        <>
          <FormControl id="province-select" flexWrap={{ lg: 'wrap' }} {...formControlProps}>
            <FormLabel fontWeight={600}>Región</FormLabel>
            <Select
              placeholder="Selecciona tu región"
              disabled={provNames.length < 1}
              onChange={(e) => {
                setStates(mappedProvinces[e.target.value]);
                handler({ province: e.target.value, stateName: '' });
              }}
              value={values ? values.province : ''}
            >
              {provNames.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="state-select" flexWrap={{ lg: 'wrap' }} {...formControlProps}>
            <FormLabel fontWeight={600}>Comuna</FormLabel>
            <Select
              placeholder="Selecciona tu comuna"
              value={values ? values.stateName : ''}
              disabled={states.length < 1}
              onChange={(e) => handler({ stateName: e.target.value })}
            >
              {states.map(({ stateName }) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export default SelectProvince;
