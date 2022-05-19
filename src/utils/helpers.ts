import { format, getHours, getMinutes } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { mapObjIndexed, reject, equals } from 'ramda';

export const dateToText = (date: Date) => {
  return format(date, "EEEE dd 'de' MMMM", { locale: esLocale });
};

export const dateToTableText = (date: Date) => {
  const dateString = format(date, "EEEE dd 'de' MMMM", { locale: esLocale });
  const dateTime = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
  return `${dateString} a las ${dateTime}`;
};

export const formatUTCDate = (date: Date) => {
  const returnDate = `${format(date, "yyyy-MM-dd'T'kk:mm")}Z`;
  return returnDate;
};

export const startOfDay = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00Z`;

export const formatDateNotHours = (date: Date): string => date.toISOString().split('T')[0];

export const endOfDay = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59Z`;

export const displayTime = (date: Date) => {
  return `${getHours(date)}:${getMinutes(date)}`;
};

export const returnHoursMinutes = (date: string) => {
  const hours = parseInt(date.split(':')[0]);
  const minutes = parseInt(date.split(':')[1]);
  return { hours, minutes };
};

export const renderDiff = (originalObj: LooseObject, objToCompare: LooseObject) => {
  const differences = reject(equals(false))(
    mapObjIndexed((val, key, obj) => {
      return originalObj[key] === val ? false : val;
    }, objToCompare)
  );
  return differences;
};
