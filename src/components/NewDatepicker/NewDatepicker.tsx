import { FC } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import Header from './NewDatepickerHeader';
import DayButton from './NewDatepickerDay';
import { isAfter, format } from 'date-fns';
import { Input } from '@chakra-ui/react';

type DatePickerT = {
  handleSelection: (param: Date) => void;
  selectedDate: Date;
  disableAfterToday?: boolean;
};

const NewDatepicker: FC<DatePickerT> = ({ selectedDate, handleSelection, disableAfterToday }) => {
  registerLocale('es', es);
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => handleSelection(date as Date)}
      locale="es"
      fixedHeight
      customInput={<Input />}
      renderDayContents={(day: number, date: Date) => {
        return (
          <DayButton
            day={day}
            date={date}
            selected={format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')}
            disabled={disableAfterToday ? isAfter(date, new Date()) : false}
          />
        );
      }}
      disabledKeyboardNavigation
      showDisabledMonthNavigation
      maxDate={disableAfterToday ? new Date() : null}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <Header
          date={date}
          changeMonth={changeMonth}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          prevMonthButtonDisabled={prevMonthButtonDisabled}
          nextMonthButtonDisabled={nextMonthButtonDisabled}
          changeYear={changeYear}
        />
      )}
    />
  );
};

export default NewDatepicker;
