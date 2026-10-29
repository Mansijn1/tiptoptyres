export const BUSINESS = {
  name: "Tiptop Tyres & Wheels",
  phone: "0452 661 100",
  phoneHref: "tel:+61452661100",
  email: "info@tiptoptyres.com.au",
  address: "Unit 3 / 9 Belomor Avenue, Mount Druitt, NSW 2770",
  mapsQuery: "Unit+3+9+Belomor+Avenue+Mount+Druitt+NSW+2770",
};

// [open, close] in 24h decimal hours, Sydney time. Index 0 = Sunday.
export const HOURS: ([number, number] | null)[] = [
  null,
  [8, 17],
  [8, 17],
  [8, 17],
  [8, 17],
  [8, 17],
  [8, 13],
];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function fmtHour(h: number) {
  const hr = Math.floor(h);
  const m = Math.round((h - hr) * 60);
  const suffix = hr >= 12 ? "PM" : "AM";
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function openStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")!.value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const h = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const m = Number(parts.find((p) => p.type === "minute")!.value);
  const t = h + m / 60;
  const today = HOURS[day];
  if (today && t >= today[0] && t < today[1]) {
    return { open: true, label: `Open today until ${fmtHour(today[1])}`, day };
  }
  if (today && t < today[0]) return { open: false, label: `Today at ${fmtHour(today[0])}`, day };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = HOURS[d];
    if (next) return { open: false, label: `${DAY_NAMES[d]} at ${fmtHour(next[0])}`, day };
  }
  return { open: false, label: "Closed", day };
}
