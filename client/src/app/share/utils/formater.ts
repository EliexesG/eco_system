export const formatHours = (date: Date) => {
  return date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'GMT',
  });
};
