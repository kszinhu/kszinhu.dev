/**
 * DateInterval is a type that represents a date interval.
 *
 * @property start - The start date of the interval.
 * @property end - The end date of the interval, if null then the interval is ongoing.
 */
export interface DateInterval {
  start: Date;
  end: Date | null;
}
