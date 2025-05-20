import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

export const secondsToLongDate = (seconds: number) =>
  dayjs(seconds * 1000).format('MMMM D, YYYY');

export const getTimeFromNow = (timestamp) => {
  // Convert seconds to milliseconds
  const timestampInMs = timestamp * 1000;

  // Get the current time and the target time
  const now = dayjs();
  const targetTime = dayjs(timestampInMs);

  // Calculate the difference in milliseconds
  const diffMs = targetTime.diff(now);

  // Create a duration object from the difference
  const diff = dayjs.duration(diffMs);

  // Get the components
  const days = Math.floor(diff.asDays());
  const hours = Math.floor(diff.asHours() % 24);
  const minutes = Math.floor(diff.asMinutes() % 60);
  const seconds = Math.floor(diff.asSeconds() % 60);

  // Format based on whether it's in the past or future
  if (diffMs < 0) {
    // Past
    const absDays = Math.abs(days);
    const absHours = Math.abs(hours);
    const absMinutes = Math.abs(minutes);
    const absSeconds = Math.abs(seconds);

    if (absDays > 0) {
      return `${absDays}d ${absHours}h ${absMinutes}m ago`;
    } else if (absHours > 0) {
      return `${absHours}h ${absMinutes}m ${absSeconds}s ago`;
    } else if (absMinutes > 0) {
      return `${absMinutes}m ${absSeconds}s ago`;
    } else {
      return `${absSeconds}s ago`;
    }
  } else {
    // Future
    if (days > 0) {
      return `in ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `in ${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `in ${minutes}m ${seconds}s`;
    } else {
      return `in ${seconds}s`;
    }
  }
};
