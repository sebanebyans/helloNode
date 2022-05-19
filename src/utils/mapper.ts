import { uniq, pick } from 'ramda';
import { EditableOrderFields } from '@redux/modal';
import { userFormFields } from './fields';

const formatPaymentDate = (date: string, paymentMethod: string) => {
  if (date === null) {
    return 'Rechazado';
  }
  if (paymentMethod === 'PayInPerson') {
    return 'Pago en laboratorio';
  }
  const paymentDate = new Date(parseInt(date)).toLocaleString('en-EN', { timeZone: 'UTC' });
  if (paymentDate.includes('1980')) {
    return 'Pago pendiente';
  }
  return paymentDate;
};
export const ordersToTableMapper = (orders: Order[]) => {
  const table = orders.reduce(
    (
      accum: any,
      { exams, booking, isCanceled, orderNumber, payment, paymentMethod, testReason }: Order
    ) => {
      const people = uniq(
        exams.map((exam: Exam) => `${exam.user.rut}${exam.user.passport}`)
      ).length;
      const orderRow = exams.map(({ user, isCovid, isFast, ...rest }: Exam) => {
        const { paymentDate } = payment;
        return {
          ...user,
          ...booking,
          ...rest,
          ...payment,
          testReason: testReason ? testReason : 'Ninguna',
          orderState: isCanceled ? 'Anulado' : 'Habilitado',
          isCovid: isCovid ? 'Si' : 'No',
          isFast: isFast ? 'Si' : 'No',
          isLab: booking.isLab ? 'Si' : 'No',
          date: new Date(booking.date).toLocaleString('es-CL', { timeZone: 'UTC' }).split(' ')[0],
          paymentDate: formatPaymentDate(paymentDate, paymentMethod),
          paymentMethod: paymentMethod === 'PayInPerson' ? 'Laboratorio' : paymentMethod,
          total: people,
          orderNumber: String(orderNumber),
        };
      });
      const currPaymentDate = orderRow[0].paymentDate;
      const shouldNotDisplay =
        currPaymentDate === 'Pago pendiente' || currPaymentDate === 'Rechazado';
      if (shouldNotDisplay) {
        return [...accum];
      }
      return [...accum, ...orderRow];
    },
    []
  );
  return table;
};

export const InputMapper = (fieldsToMap: EditableOrderFields | null) => {
  return fieldsToMap && pick(Object.keys(fieldsToMap), userFormFields);
};
