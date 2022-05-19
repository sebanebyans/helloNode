import { Row } from 'react-table';

const dateRangeFilterHandler = (rows: Row[], id: string, filterValues: string[]) => {
  let startDate = filterValues[0] ? new Date(filterValues[0]) : undefined;
  let endDate = filterValues[1] ? new Date(filterValues[1]) : undefined;
  if (endDate || startDate) {
    return rows.filter((row) => {
      var time = new Date(row.values[id]);

      if (endDate && startDate) {
        return time >= startDate && time <= endDate;
      } else if (startDate) {
        return time >= startDate;
      } else if (endDate) {
        return time <= endDate;
      }
    });
  } else {
    return rows;
  }
};

export default dateRangeFilterHandler;
