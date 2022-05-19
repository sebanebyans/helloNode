import { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { Calendar, GetBackForwardPropsOptions } from 'dayzed';

type DatePickerButtonsT = {
  calendars: Calendar[];
  getProps: (data: GetBackForwardPropsOptions | GetBackForwardPropsOptions) => Record<string, any>;
  backButton?: boolean;
};

const DatePickerButtons: FC<DatePickerButtonsT> = ({ calendars, getProps, backButton }) => {
  return (
    <>
      {backButton ? (
        <>
          <Button
            {...getProps({
              calendars,
              offset: 12,
            })}
            variant="ghost"
            size="sm"
            align="center"
          >
            {'<<'}
          </Button>
          <Button {...getProps({ calendars })} variant="ghost" size="sm" align="center">
            {'<'}
          </Button>
        </>
      ) : (
        <>
          <Button {...getProps({ calendars })} variant="ghost" size="sm" align="center">
            {'>'}
          </Button>
          <Button
            {...getProps({
              calendars,
              offset: 12,
            })}
            variant="ghost"
            size="sm"
            align="center"
          >
            {'>>'}
          </Button>
        </>
      )}
    </>
  );
};
export default DatePickerButtons;
