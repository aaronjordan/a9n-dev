function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toYmdUTC(d: Date) {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

export function toStampUTC(d: Date) {
  return `${pad2(d.getUTCMonth() + 1)} / ${pad2(d.getUTCDate())}`;
}

export function toLongUTC(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
