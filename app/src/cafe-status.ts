import { useEffect, useState } from 'react';

/** Share of peak guests for each hour 7–17 ("Usually busy" in the design spec). */
export const BUSY_BY_HOUR: [hour: number, share: number][] = [
  [7, 35], [8, 95], [9, 80], [10, 45], [11, 40], [12, 70], [13, 65], [14, 35], [15, 50], [16, 55], [17, 30],
];

// Opening hours (Mon–Fri 7–18, Sat–Sun 8–17), evaluated in the café's own time zone.
const TIME_ZONE = 'Europe/Copenhagen';
const WEEKDAY = { open: 7, close: 18 };
const WEEKEND = { open: 8, close: 17 };
const NEXT_DAY: Record<string, string> = { Mon: 'Tue', Tue: 'Wed', Wed: 'Thu', Thu: 'Fri', Fri: 'Sat', Sat: 'Sun', Sun: 'Mon' };

export type BusyLevel = 'quiet' | 'steady' | 'busy';
export type CafeStatus =
  | { open: true; hour: number; level: BusyLevel; opens: number; closes: number }
  | { open: false; nextOpen: number };

const hoursFor = (weekday: string) => (weekday === 'Sat' || weekday === 'Sun' ? WEEKEND : WEEKDAY);

const copenhagenNow = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, weekday: 'short', hour: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { weekday: get('weekday'), hour: Number(get('hour')) };
};

export function getCafeStatus(date = new Date()): CafeStatus {
  const { weekday, hour } = copenhagenNow(date);
  const today = hoursFor(weekday);
  if (hour >= today.open && hour < today.close) {
    const share = BUSY_BY_HOUR.find(([h]) => h === hour)?.[1] ?? 0;
    const level: BusyLevel = share >= 75 ? 'busy' : share >= 50 ? 'steady' : 'quiet';
    return { open: true, hour, level, opens: today.open, closes: today.close };
  }
  // Before opening it is today's opening time; after closing, tomorrow's.
  const next = hour < today.open ? today : hoursFor(NEXT_DAY[weekday]);
  return { open: false, nextOpen: next.open };
}

/** Live status, refreshed every minute while the page is open. */
export function useCafeStatus() {
  const [status, setStatus] = useState(getCafeStatus);
  useEffect(() => {
    const timer = window.setInterval(() => setStatus(getCafeStatus()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return status;
}

export const clock = (hour: number) => `${hour}:00`;
