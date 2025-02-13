import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const secondsToLongDate = (seconds: number) =>
  dayjs(seconds * 1000).format('MMMM D, YYYY');
