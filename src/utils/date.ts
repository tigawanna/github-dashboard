export function getMonthFromNumber(monthNumbers:number){
    const date = new Date();
    date.setMonth(monthNumbers - 1);
    return date.toLocaleString("en-US", { month: "long" });
}

//  get the month and yaer numbers from data
export function getMonthAndYear() {
  const date = new Date();
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

export function getMonthName(month_num: number) {
  const date = new Date();
  date.setMonth(month_num - 1);
  return date.toLocaleString("en-US", { month: "long" });
}

export function getPrevMonthandYear(month_num?: number) {
  const date = new Date();
  const curr_month = date.getMonth() - 1;
  date.setMonth(month_num ? month_num - 2 : curr_month);
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
export function getRelativeTimeString(
  date: Date | number | string,
  lang = navigator.language,
): string {
  // Allow dates or times to be passed

  const timeMs =
    typeof date === "string"
      ? new Date(date).getTime()
      : typeof date === "number"
      ? date
      : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = (unitIndex ? cutoffs[unitIndex - 1] : 1) || 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]||"hour");
}

export const formatRelativeDate = getRelativeTimeString

export function isdateGreater(date1: Date|string, date2: Date|string) {
  if(typeof date1 === "string") date1 = new Date(date1);
  if(typeof date2 === "string") date2 = new Date(date2);
  // const date1Time = date1.getTime();
  // const date2Time = date2.getTime();
  // console.log({date1Time, date2Time});
  return date1.getTime() - date2.getTime() > 0;
}
