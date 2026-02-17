import { formatDistanceToNow, format } from 'date-fns';

export const articleDate = (date: string): string => {
  return format(new Date(date), 'MMMM d, yyyy hh:mm a O');
};

export const cardDate = (date: string): string => {
  const fullDate = new Date(date);
  const diffDate = Date.now() - fullDate.getTime();

  if (diffDate < 1000 * 60 * 5) {
    return 'Just Now';
  }
  if (diffDate < 1000 * 60 * 60 * 24) {
    return formatDistanceToNow(fullDate, { addSuffix: true });
  }
  if (diffDate < 1000 * 60 * 60 * 36) {
    return 'Yesterday';
  }

  return format(fullDate, 'MMMM d, yyyy');
};

