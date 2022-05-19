import { createContext, ReactNode, useState } from 'react';
import { BOOKING_SCHEDULES } from '@src/utils/constants';
import { SchedulesT } from '@utils/constants';
import { set } from 'date-fns';
import { formatUTCDate, returnHoursMinutes } from '@utils/helpers';
import { without, omit } from 'ramda';

export interface StateOption {
  readonly value: string;
  readonly label: string;
}

type ExceptionsT = {
  children: ReactNode;
};

type ExeptionsConfigT = {
  id: string;
  title?: string;
  isLab: boolean;
  isCovid: boolean;
  from: Date;
  until: Date;
  stateNames: StateOption[];
  limit: number;
};

type ExeptionparamsT = {
  id?: string;
  title?: string;
  isLab?: boolean;
  isCovid?: boolean;
  from?: Date;
  until?: Date;
  stateNames?: StateOption[];
  limit?: number;
};
type ContextT = {
  scheduleHandler: (something: any) => void;
  setNewSchedule: (id: SchedulesT) => void;
  createNewException: () => LooseObject;
  schedule: ExeptionsConfigT;
  handleTime: (param: TimeT) => void;
};

interface FromT {
  from: string;
  until?: never;
}
interface UntilT {
  until: string;
  from?: never;
}
type TimeT = FromT | UntilT;

const scheduleConfig = {
  from: new Date(),
  until: new Date(),
  stateNames: [],
  limit: 0,
};

const initialSchedule = {
  ...BOOKING_SCHEDULES['domicilio-covid'],
  ...scheduleConfig,
};

export const ExceptionsContext = createContext<ContextT>({
  scheduleHandler: () => {},
  setNewSchedule: (id: SchedulesT) => {},
  schedule: {
    ...initialSchedule,
  },
  createNewException: () => ({}),
  handleTime: (param: TimeT) => {},
});

const ExceptionsProvider: React.FC<ExceptionsT> = ({ children }) => {
  const [schedule, setSchedule] = useState<ExeptionsConfigT>(initialSchedule);
  const setNewSchedule = (id: SchedulesT) =>
    setSchedule({
      ...BOOKING_SCHEDULES[id],
      from: schedule.from,
      until: schedule.until,
      stateNames: schedule.stateNames,
      limit: schedule.limit,
    });
  const scheduleHandler = (param: ExeptionparamsT) => {
    setSchedule({ ...schedule, ...param });
  };
  const handleTime = ({ from, until }: TimeT) => {
    if (from) {
      return scheduleHandler({ from: set(schedule.from, { ...returnHoursMinutes(from) }) });
    }
    if (until) {
      return scheduleHandler({ until: set(schedule.until, { ...returnHoursMinutes(until) }) });
    }
  };
  const createNewException = () => {
    const newException = omit(['from', 'until', 'title'], schedule);
    const from = formatUTCDate(schedule.from);
    const until = formatUTCDate(schedule.until);
    const stateNames = schedule.stateNames.map(({ value }: { value: string }) => value);
    return { ...newException, from, until, stateNames };
  };
  return (
    <ExceptionsContext.Provider
      value={{
        scheduleHandler,
        setNewSchedule,
        schedule,
        createNewException,
        handleTime,
      }}
    >
      {children}
    </ExceptionsContext.Provider>
  );
};

export default ExceptionsProvider;
