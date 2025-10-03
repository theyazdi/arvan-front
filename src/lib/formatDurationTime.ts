export const formatDuration = (duration: string) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return "";

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;

  return `${hours}h ${minutes}m`;
};
