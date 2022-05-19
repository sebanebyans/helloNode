import { FC } from 'react';
import { mapObjIndexed } from 'ramda';
import { FormControl, FormLabel, Select, Input } from '@chakra-ui/react';

type OptionProps = {
  label: string;
  value: string | number;
};

const formControlProps = {
  w: { base: 'full', lg: '45%' },
  alignItems: { lg: 'flex-end' },
  justifyContent: { lg: 'flex-start' },
  display: { lg: 'flex' },
  _even: {
    ml: { lg: 4 },
  },
  _odd: {
    mr: { lg: 4 },
  },
};

type MapperT = {
  fieldsToMap: LooseObject | null;
  values: LooseObject | null;
  handler: (param: LooseObject) => void;
};

const InputMapper: FC<MapperT> = ({ fieldsToMap, values, handler }) => {
  const fields = fieldsToMap
    ? Object.values(
        mapObjIndexed((value: LooseObject, key) => {
          const currentName = key;
          const { registerProps, inputProps } = value;
          const { required } = registerProps;
          const { label, type, options } = inputProps;
          const inputValue = values ? values[key] : null;
          if (options) {
            return (
              <FormControl
                id={currentName}
                key={currentName}
                isRequired={required}
                flexWrap={{ lg: 'wrap' }}
                {...formControlProps}
              >
                {label && (
                  <FormLabel mt="1rem" fontWeight={600}>
                    {label}
                  </FormLabel>
                )}
                <Select
                  {...inputProps}
                  _placeholder={{ color: 'red.500' }}
                  onChange={(e) => handler({ [key]: e.target.value })}
                  value={inputValue}
                >
                  {options.map(({ label, value }: OptionProps) => (
                    <option key={label} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            );
          }
          if (type) {
            return (
              <FormControl
                id={currentName}
                key={currentName}
                isRequired={required}
                flexWrap={{ lg: 'wrap' }}
                {...formControlProps}
              >
                {label && (
                  <FormLabel mt="1rem" fontWeight={600}>
                    {label}
                  </FormLabel>
                )}
                <Input
                  {...inputProps}
                  mb="1rem"
                  value={inputValue}
                  onChange={(e) => handler({ [key]: e.target.value })}
                />
              </FormControl>
            );
          }
        }, fieldsToMap)
      )
    : null;
  return <>{fields}</>;
};
export default InputMapper;
