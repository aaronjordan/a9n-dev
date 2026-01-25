import { test, expect } from "bun:test";
import { toYmdUTC, toStampUTC, toLongUTC } from "./dates";

test("toYmdUTC formats date as YYYY-MM-DD", () => {
  const date = new Date(Date.UTC(2025, 11, 22)); // Dec 22, 2025
  expect(toYmdUTC(date)).toBe("2025-12-22");
});

test("toStampUTC formats date as MM / DD", () => {
  const date = new Date(Date.UTC(2025, 11, 22));
  expect(toStampUTC(date)).toBe("12 / 22");
});

test("toLongUTC formats date as full readable string", () => {
  const date = new Date(Date.UTC(2025, 11, 22));
  expect(toLongUTC(date)).toBe("December 22, 2025");
});

test("pads single-digit months and days", () => {
  const date = new Date(Date.UTC(2025, 0, 5)); // Jan 5, 2025
  expect(toYmdUTC(date)).toBe("2025-01-05");
  expect(toStampUTC(date)).toBe("01 / 05");
});

test("handles timezone edge case - date near midnight UTC", () => {
  // A date that would shift to previous day in negative UTC offsets
  const date = new Date(Date.UTC(2025, 11, 22, 0, 0, 0));
  expect(toYmdUTC(date)).toBe("2025-12-22");
  expect(toLongUTC(date)).toBe("December 22, 2025");
});
