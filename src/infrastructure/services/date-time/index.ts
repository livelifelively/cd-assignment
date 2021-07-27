import moment from 'moment';

export const formatDate = (input: number, format?: string) => {
  const dateFormat = format ? format : 'DD MMM YYYY';

  const date = new Date(input);
  return moment(date).format(dateFormat);
};

export const timeStampForDaysFromToday = (daysFrom: any) => {
  return moment().startOf('day').subtract(daysFrom, 'day').unix();
};
