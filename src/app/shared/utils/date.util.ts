import { format } from 'date-fns';

export class DateUtil {
  public static getFormattedDate(date: Date): string {
    return format(date, 'dd/MM/yyyy hh:mm');
  }
}
