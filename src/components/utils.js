export function formatTime(isoString) {
  const date = new Date(isoString);
  const now  = new Date();

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (sameDay(date, now)) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (sameDay(date, yesterday)) {
    return 'Yesterday';
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function formatDateLabel(isoString) {
  const date = new Date(isoString);
  const now  = new Date();

  const sameYear = date.getFullYear() === now.getFullYear();
  const today    = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const msgDay    = new Date(date);  msgDay.setHours(0,0,0,0);

  if (msgDay.getTime() === today.getTime())     return 'Today';
  if (msgDay.getTime() === yesterday.getTime()) return 'Yesterday';
  return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) });
}

export function genId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function getLastMessage(thread) {
  if (!thread || thread.length === 0) return null;
  return thread[thread.length - 1];
}
