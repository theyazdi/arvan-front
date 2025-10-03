import { format, parseISO } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import jalaali from "jalaali-js";

export function formatPersianDate(date: Date | string, formatString: string = "yyyy/MM/dd"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString, { locale: faIR });
}

export function formatPersianDateTime(date: Date | string, formatString: string = "yyyy/MM/dd HH:mm"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString, { locale: faIR });
}

export function formatPersianTime(date: Date | string, formatString: string = "HH:mm"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString, { locale: faIR });
}

export function formatPersianMonth(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMMM yyyy", { locale: faIR });
}

export function formatPersianDay(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "EEEE", { locale: faIR });
}

export function formatPersianShortDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MM/dd", { locale: faIR });
}

// Format date for display in Persian using date-fns-jalali for consistency with calendar
export function formatDateForDisplay(date: Date | undefined): string {
  if (!date) return "انتخاب کنید";
  return formatPersianDate(date, "dd MMMM yyyy");
}

// Format date range for display in Persian
export function formatDateRangeForDisplay(fromDate: Date | undefined, toDate: Date | undefined): string {
  if (!fromDate && !toDate) return "تاریخ مورد نظر";
  
  const fromStr = fromDate ? formatDateForDisplay(fromDate) : "";
  const toStr = toDate ? formatDateForDisplay(toDate) : "";
  
  if (fromDate && toDate) {
    return `${fromStr} - ${toStr}`;
  } else if (fromDate) {
    return fromStr;
  } else {
    return toStr;
  }
}

// Get current Persian month name using jalaali-js
export function getCurrentPersianMonth(): string {
  const now = new Date();
  const jDate = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];
  
  return `${persianMonths[jDate.jm - 1]} ${jDate.jy}`;
}
